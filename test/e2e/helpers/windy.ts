import type { Locator } from '@playwright/test';

/**
 * What the card actually painted, read back out of the DOM.
 *
 * The card embeds Windy in an `<iframe>`, so there is no SVG to measure and
 * nothing inside the frame that a test may reach into - it is a third-party
 * document on another origin. What the card *does* own is the iframe's `src`,
 * and every configuration option ends up as a query parameter on it. Turning
 * that back into a plain object is what lets a spec say "overlay radar, zoom 7,
 * centred here" instead of restating the card's own string concatenation.
 *
 * Nothing here needs windy.com to answer: the assertions are about the element
 * and the URL the card built, which exist whether or not the frame ever loads.
 */
export interface Embed {
  /** The full src, so a spec can assert the origin and the embed endpoint. */
  src: string;
  /** `type=map` or `type=forecast` - which of the two embeds this is. */
  type: string;
  params: Record<string, string>;
}

const EMBED_ORIGIN = 'https://embed.windy.com';

/** The iframes the card renders, in document order. */
export function embedFrames(card: Locator): Locator {
  return card.locator('.iframe-container iframe');
}

/** Reads one iframe's src and decodes the Windy parameters off it. */
export async function embed(frame: Locator): Promise<Embed> {
  const src = (await frame.getAttribute('src')) ?? '';
  if (!src.startsWith(`${EMBED_ORIGIN}/`)) {
    throw new Error(`iframe src is not a Windy embed: ${JSON.stringify(src)}`);
  }
  const params = Object.fromEntries(new URL(src).searchParams.entries());
  return { src, type: params.type ?? '', params };
}

/** Every embed the card currently shows. */
export async function embeds(card: Locator): Promise<Embed[]> {
  const frames = await embedFrames(card).all();
  return Promise.all(frames.map((frame) => embed(frame)));
}
