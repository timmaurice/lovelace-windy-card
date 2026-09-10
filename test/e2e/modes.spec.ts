import { test, expect } from './fixtures/hass';
import { removeState, setState, useDashboard } from './helpers/homeassistant';
import { embed, embedFrames } from './helpers/windy';

/**
 * The single-panel modes and the entity-driven overlay.
 *
 * `map_only` and `forecast_only` drop the tab strip entirely, so a mistake
 * there is not a wrong pixel but a card with no way to reach the other half.
 * And `overlay_entity` is the only option whose value arrives over the
 * websocket after the card is already on screen - a unit test hands the card a
 * `hass` object and calls it a day, which never exercises the push.
 */
const OVERLAY = 'sensor.e2e_windy_overlay';
const ENTITIES = [OVERLAY];

let urlPath: string;

test.beforeAll(async () => {
  await setState(OVERLAY, 'clouds', { friendly_name: 'E2E Windy Overlay' });

  const common = { type: 'custom:windy-card', zoom: 5, aspect_ratio: '16:9', static_map: true };

  urlPath = await useDashboard('modes', {
    views: [
      {
        title: 'Map only',
        cards: [{ ...common, title: 'Map only', default_mode: 'map_only', overlay_entity: OVERLAY }],
      },
      {
        title: 'Forecast only',
        cards: [{ ...common, title: 'Forecast only', default_mode: 'forecast_only' }],
      },
    ],
  });
});

test.afterAll(async () => {
  for (const entity of ENTITIES) await removeState(entity);
});

test.describe('Single-panel modes', () => {
  test('map_only paints the map and no tab strip, and follows the overlay entity', async ({ page, consoleErrors }) => {
    await page.goto(`/${urlPath}/0`);

    const card = page.locator('windy-card');
    await expect(card.locator('ha-card')).toBeVisible({ timeout: 60_000 });
    await expect(card.locator('.modes')).toHaveCount(0);
    await expect(card.locator('.mode-tab')).toHaveCount(0);

    const frame = embedFrames(card);
    await expect(frame).toHaveCount(1);
    expect((await embed(frame)).type).toBe('map');
    // The overlay came from the entity's state, not from the config.
    expect((await embed(frame)).params.overlay).toBe('clouds');

    // Push a new state and the card has to rebuild the embed on its own. This
    // is the whole point of running against a live instance.
    await setState(OVERLAY, 'radar', { friendly_name: 'E2E Windy Overlay' });
    await expect.poll(async () => (await embed(embedFrames(card))).params.overlay, { timeout: 30_000 }).toBe('radar');

    expect(consoleErrors).toEqual([]);
  });

  test('says so when the overlay entity has no usable state, instead of sending it to Windy', async ({
    page,
    consoleErrors,
  }) => {
    // An integration restarting is enough to make this happen, and until the card
    // resolved the entity properly `overlay=unavailable` went straight into the embed
    // URL - a blank map with nothing anywhere saying why.
    await setState(OVERLAY, 'unavailable', { friendly_name: 'E2E Windy Overlay' });
    await page.goto(`/${urlPath}/0`);

    const card = page.locator('windy-card');
    await expect(card.locator('ha-card')).toBeVisible({ timeout: 60_000 });

    const problem = card.locator('.entity-problem');
    await expect(problem).toHaveCount(1);
    await expect(problem).toContainText(OVERLAY);

    // The URL falls back to the default layer rather than carrying the state.
    await expect.poll(async () => (await embed(embedFrames(card))).params.overlay, { timeout: 30_000 }).toBe('wind');

    // And it recovers on its own once the entity reports a layer again.
    await setState(OVERLAY, 'clouds', { friendly_name: 'E2E Windy Overlay' });
    await expect.poll(async () => (await embed(embedFrames(card))).params.overlay, { timeout: 30_000 }).toBe('clouds');
    await expect(card.locator('.entity-problem')).toHaveCount(0);

    expect(consoleErrors).toEqual([]);
  });

  test('forecast_only paints the forecast panel with neither tabs nor an interaction lock', async ({
    page,
    consoleErrors,
  }) => {
    await page.goto(`/${urlPath}/1`);

    const card = page.locator('windy-card');
    await expect(card.locator('ha-card')).toBeVisible({ timeout: 60_000 });
    await expect(card.locator('.mode-tab')).toHaveCount(0);

    const forecast = await embed(embedFrames(card));
    expect(forecast.type).toBe('forecast');
    expect(forecast.params.detail).toBe('true');

    // `_getRatioPadding` returns null in forecast_only, so the frame is sized
    // by its own height attribute instead of by an aspect-ratio wrapper.
    await expect(card.locator('.iframe-container.ratio-wrapper')).toHaveCount(0);
    await expect(card.locator('.static-toggle-button')).toHaveCount(0);
    expect((await embedFrames(card).boundingBox())!.height).toBeGreaterThan(100);

    expect(consoleErrors).toEqual([]);
  });
});
