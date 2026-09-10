/**
 * Talks to the Home Assistant that the repository's own `docker-compose.yml`
 * already provides.
 *
 * This repository ships no integration - the card is a plain Lovelace resource.
 * The compose file mounts `dist/` straight into the container's `/config/www`
 * and `ha-config/configuration.yaml` declares the resource, so the suite reuses
 * exactly the environment a developer clicks around in by hand. Everything it
 * writes goes into a dashboard of its own, so the `ui-lovelace.yaml` playground
 * stays intact.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const E2E_DIR = resolve(here, '..');
const REPO_ROOT = resolve(E2E_DIR, '../..');
/** The compose file lives at the repository root, next to `ha-config/`. */
const COMPOSE_DIR = REPO_ROOT;
export const BUNDLE_NAME = 'windy-card.js';
/**
 * `dist/` is mounted as `/config/www`, so the bundle is served flat under
 * `/local/`, not under `/local/dist/`.
 */
export const BUNDLE_URL = `/local/${BUNDLE_NAME}`;
const BUNDLE = resolve(REPO_ROOT, `dist/${BUNDLE_NAME}`);
const PACKAGE_JSON = resolve(REPO_ROOT, 'package.json');
const TOKEN_FILE = resolve(E2E_DIR, '.auth.json');

/** Read from the compose file so the suite cannot drift from the environment. */
function portFromCompose(): string {
  const compose = readFileSync(resolve(COMPOSE_DIR, 'docker-compose.yml'), 'utf8');
  // The port may be quoted or bare - YAML allows both, and this file uses bare.
  const match = compose.match(/['"]?(\d+):8123['"]?/);
  if (!match) throw new Error('No published Home Assistant port found in docker-compose.yml');
  return match[1];
}

export const PORT = process.env.HA_E2E_PORT ?? portFromCompose();
export const BASE_URL = `http://127.0.0.1:${PORT}`;
export const USERNAME = process.env.HA_E2E_USER ?? 'admin';
export const PASSWORD = process.env.HA_E2E_PASSWORD ?? 'password';

/**
 * The bundle is bind-mounted into the container, so the browser gets whatever
 * is on disk - not what `src/` currently says. Rollup stamps `v<version>` into
 * the banner it prints on load, so the version in the file is a cheap way of
 * noticing that the built bundle predates the package. That has bitten sibling
 * repositories: the suite passed against an old bundle and said nothing about
 * the code under test.
 */
function assertBundleIsCurrent(): void {
  const { version } = JSON.parse(readFileSync(PACKAGE_JSON, 'utf8')) as { version: string };
  const bundle = readFileSync(BUNDLE, 'utf8');
  if (!bundle.includes(`v${version}`)) {
    throw new Error(
      `dist/${BUNDLE_NAME} does not carry v${version} - the built bundle is stale, run \`npm run build\``,
    );
  }
}

/** Brings the repository's own compose environment up if it is not running. */
export function ensureRunning(): void {
  // The container serves the card straight out of dist/. Without a build there
  // is nothing to load, and every spec would fail on a missing custom element
  // instead of saying what is actually wrong.
  if (!existsSync(BUNDLE)) {
    throw new Error(`No ${BUNDLE} - run \`npm run build\` before the end-to-end suite`);
  }
  assertBundleIsCurrent();
  execFileSync('docker', ['compose', 'up', '-d'], { cwd: COMPOSE_DIR, stdio: 'inherit' });
}

export async function waitForFrontend(timeoutMs = 180_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      // Not /api/onboarding: that endpoint is gone once onboarding is done.
      const res = await fetch(`${BASE_URL}/manifest.json`);
      if (res.ok) return;
    } catch {
      // not listening yet
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error(`Home Assistant did not answer at ${BASE_URL} within ${timeoutMs}ms`);
}

/**
 * Waits until the core is actually running, not merely answering HTTP.
 *
 * Lovelace resources and the helpers `configuration.yaml` defines land well
 * after the HTTP server starts serving. A check that stops at the frontend can
 * therefore read a half-set-up instance and fail on things that were only late,
 * not broken.
 */
export async function waitForCoreRunning(timeoutMs = 180_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  let lastState = 'unknown';
  while (Date.now() < deadline) {
    try {
      const config = await callWebsocket<{ state: string }>({ type: 'get_config' });
      lastState = config.state;
      if (config.state === 'RUNNING') return;
    } catch {
      // websocket not ready yet
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error(`Home Assistant never reached RUNNING (last saw ${lastState})`);
}

export interface Tokens {
  access_token: string;
}

export function saveTokens(tokens: Tokens): void {
  writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
}

export function readTokens(): Tokens {
  if (!existsSync(TOKEN_FILE)) throw new Error('No token file - did global setup run?');
  return JSON.parse(readFileSync(TOKEN_FILE, 'utf8')) as Tokens;
}

/**
 * Sends one command over the websocket API and returns its result. Node ships a
 * WebSocket client, so this needs no dependency, and it is the same API the
 * frontend itself speaks.
 */
export async function callWebsocket<T = unknown>(message: Record<string, unknown>): Promise<T> {
  const token = readTokens().access_token;
  const socket = new WebSocket(`ws://127.0.0.1:${PORT}/api/websocket`);

  return new Promise<T>((resolve_, reject) => {
    const fail = (reason: string) => {
      socket.close();
      reject(new Error(reason));
    };
    const timer = setTimeout(() => fail('websocket timed out'), 30_000);

    socket.addEventListener('error', () => fail('websocket error'));
    socket.addEventListener('message', (event) => {
      const payload = JSON.parse(String(event.data)) as Record<string, unknown>;
      switch (payload.type) {
        case 'auth_required':
          socket.send(JSON.stringify({ type: 'auth', access_token: token }));
          return;
        case 'auth_invalid':
          clearTimeout(timer);
          fail('websocket authentication was refused');
          return;
        case 'auth_ok':
          socket.send(JSON.stringify({ id: 1, ...message }));
          return;
        case 'result': {
          clearTimeout(timer);
          socket.close();
          if (payload.success) resolve_(payload.result as T);
          else reject(new Error(`websocket command failed: ${JSON.stringify(payload.error)}`));
        }
      }
    });
  });
}

/** Puts a state on the bus, the way any client would. */
export async function setState(
  entityId: string,
  state: string,
  attributes: Record<string, unknown> = {},
): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/states/${entityId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${readTokens().access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state, attributes }),
  });
  if (!res.ok) throw new Error(`setting ${entityId} failed: ${res.status} ${await res.text()}`);
}

export async function removeState(entityId: string): Promise<void> {
  await fetch(`${BASE_URL}/api/states/${entityId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${readTokens().access_token}` },
  });
}

/**
 * Gives the caller its own dashboard.
 *
 * Every spec file asks for a different name, so specs can run in parallel
 * without fighting over one dashboard - and none of them touches whatever the
 * manual test instance has on its own dashboards. A dashboard of our own is
 * also the only reliable path: in HA 2026.9 `/lovelace/0` redirects to the new
 * home panel, so the shipped overview cannot be driven from a test.
 */
export async function useDashboard(name: string, config: Record<string, unknown>): Promise<string> {
  const urlPath = `e2e-${name}`;
  const dashboards = await callWebsocket<{ url_path: string }[]>({
    type: 'lovelace/dashboards/list',
  });
  if (!dashboards.some((dashboard) => dashboard.url_path === urlPath)) {
    await callWebsocket({
      type: 'lovelace/dashboards/create',
      url_path: urlPath,
      title: `E2E ${name}`,
      mode: 'storage',
      show_in_sidebar: false,
    });
  }
  await callWebsocket({ type: 'lovelace/config/save', url_path: urlPath, config });
  return urlPath;
}

/** The Lovelace resources Home Assistant has persisted. */
export async function resources(): Promise<{ id: string; url: string }[]> {
  return callWebsocket({ type: 'lovelace/resources' });
}
