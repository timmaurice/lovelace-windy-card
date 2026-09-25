import { test, expect } from './fixtures/hass';
import { removeState, setState, useDashboard } from './helpers/homeassistant';
import { embed, embedFrames, embeds } from './helpers/windy';

/**
 * The card centres itself on whatever entity `location` names, as long as that
 * entity carries `latitude` and `longitude` attributes - that is all
 * `_getLocation` looks at. A zone is the natural carrier, and seeding one is
 * what proves the card reads the state machine rather than falling back to the
 * instance's own home coordinates.
 */
const SPOT = 'zone.e2e_windy_spot';
const ENTITIES = [SPOT];

const SPOT_LAT = 52.25;
const SPOT_LON = 5.75;

let urlPath: string;

test.beforeAll(async () => {
  await setState(SPOT, 'zoning', {
    friendly_name: 'E2E Windy Spot',
    latitude: SPOT_LAT,
    longitude: SPOT_LON,
    radius: 100,
    passive: false,
  });

  urlPath = await useDashboard('card', {
    views: [
      {
        title: 'Windy',
        cards: [
          {
            type: 'custom:windy-card',
            title: 'E2E windy',
            location: SPOT,
            overlay: 'radar',
            zoom: 7,
            // A unit whose value is not URL-safe, so the embed URL has to carry it encoded.
            metric_wind: 'm/s',
            aspect_ratio: '16:9',
            // The lock is the default the README recommends for a dashboard, and
            // it keeps the frame from swallowing the clicks these tests make.
            static_map: true,
          },
        ],
      },
      { title: 'Elsewhere', cards: [{ type: 'markdown', content: 'nothing here' }] },
    ],
  });
});

test.afterAll(async () => {
  for (const entity of ENTITIES) await removeState(entity);
});

test.describe('The card on a sections dashboard', () => {
  test('is given a box the map actually fits in', async ({ page, consoleErrors }) => {
    // A sections view lays its cards out in grid rows, and it asks the element itself
    // how many it wants. A card that does not answer leaves that to the dashboard's
    // defaults, so the answer is worth asserting where a real dashboard asks for it.
    const sectionsPath = await useDashboard('card-sections', {
      views: [
        {
          type: 'sections',
          title: 'Sections',
          sections: [
            {
              type: 'grid',
              cards: [{ type: 'custom:windy-card', title: 'E2E sections', location: SPOT, static_map: true }],
            },
          ],
        },
      ],
    });

    await page.goto(`/${sectionsPath}/0`);
    const card = page.locator('windy-card');
    await expect(card.locator('ha-card')).toBeVisible({ timeout: 60_000 });

    // Through the locator, because the card lives inside the dashboard's shadow roots.
    // The literal getGridOptions() returns is pinned by the unit test; copying it here
    // only went stale. What this test adds is that Home Assistant lays the card out by
    // whatever the served bundle answers: a numeric width lands on the wrapper as
    // --column-size, while columns: 'full' sets none and marks the wrapper full-width.
    const { options, wrapper } = await card.evaluate(
      (element: HTMLElement & { getGridOptions?: () => { columns?: number | 'full' } }) => {
        const cell = element.closest('.card') as HTMLElement | null;
        return {
          options: element.getGridOptions ? element.getGridOptions() : null,
          wrapper: {
            columnSize: cell?.style.getPropertyValue('--column-size').trim(),
            fullWidth: cell?.classList.contains('full-width'),
          },
        };
      },
    );
    expect(options).not.toBeNull();
    expect(wrapper).toEqual(
      options!.columns === 'full'
        ? { columnSize: '', fullWidth: true }
        : { columnSize: String(options!.columns), fullWidth: false },
    );

    // And the map is really there at a usable size, not squeezed into a stub of a card.
    const box = (await card.locator('ha-card').boundingBox())!;
    expect(box.height).toBeGreaterThan(300);
    await expect(embedFrames(card)).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });
});

test.describe('The card on a real dashboard', () => {
  test('paints the card, its tabs and a Windy embed built from the configuration', async ({ page, consoleErrors }) => {
    await page.goto(`/${urlPath}/0`);

    // Assert on what the card paints, not on the custom element itself: the
    // host has no box of its own, so Playwright rightly calls it hidden.
    const card = page.locator('windy-card');
    const haCard = card.locator('ha-card');
    await expect(haCard).toBeVisible({ timeout: 60_000 });
    await expect(haCard).toContainText('E2E windy');

    // Both modes are offered, and the map one is the selected tab. The labels
    // are localized against the instance's own language, so the assertion is
    // that they are labelled at all - hardcoding "Map"/"Forecast" would only
    // pass on an English instance.
    await expect(card.locator('.mode-tab[data-mode="map"]')).toHaveAttribute('aria-selected', 'true');
    await expect(card.locator('.mode-tab[data-mode="forecast"]')).toHaveAttribute('aria-selected', 'false');
    for (const mode of ['map', 'forecast']) {
      const label = (await card.locator(`.mode-tab[data-mode="${mode}"]`).innerText()).trim();
      expect(label, `the ${mode} tab is labelled`).not.toBe('');
    }

    // The embed itself. Windy is a third party on another origin, so the
    // assertion stops at the element and the URL the card built - it never
    // reaches into the frame and it does not need windy.com to answer.
    const frame = embedFrames(card);
    await expect(frame).toHaveCount(1);
    await expect(frame).toBeVisible();

    const map = await embed(frame);
    expect(map.type).toBe('map');
    // Every configured option has to survive into the URL, including the
    // coordinates the card looked up on the seeded zone.
    expect(map.params.overlay).toBe('radar');
    expect(map.params.zoom).toBe('7');
    expect(Number(map.params.lat)).toBeCloseTo(SPOT_LAT, 5);
    expect(Number(map.params.lon)).toBeCloseTo(SPOT_LON, 5);
    // radar is one of the overlays that carries no product of its own.
    expect(map.params.product).toBeUndefined();
    // The slash has to survive as part of the value rather than as a path separator.
    expect(map.params.metricWind).toBe('m/s');
    expect(map.src).not.toContain('m/s');

    // 16:9 is painted as the wrapper's padding, which is what gives the frame
    // its box at all - a broken ratio collapses the card to zero height.
    const wrapper = card.locator('.iframe-container.ratio-wrapper');
    await expect(wrapper).toHaveAttribute('style', /padding-bottom: 56\.25/);
    const box = await wrapper.boundingBox();
    expect(box!.height).toBeGreaterThan(100);
    expect(box!.height / box!.width).toBeCloseTo(9 / 16, 1);

    // The overlay buttons the card draws over the frame, and the lock the
    // config asked for. They are icon-only, so the accessible name has to come
    // from the label - a real browser is where that is worth asserting.
    await expect(card.locator('.reset-button')).toBeVisible();
    await expect(card.locator('.static-toggle-button.is-active')).toBeVisible();
    await expect(card.locator('.fullscreen-button')).toBeVisible();
    for (const button of ['.reset-button', '.static-toggle-button', '.fullscreen-button']) {
      const name = await card.locator(button).getAttribute('aria-label');
      expect(name?.trim(), `${button} is named`).toBeTruthy();
    }
    await expect(card.locator('.static-toggle-button')).toHaveAttribute('aria-pressed', 'true');
    await expect(embedFrames(card)).toHaveAttribute('title', /.+/);

    // Switching tabs swaps the embed for the forecast one, same location.
    await card.locator('.mode-tab[data-mode="forecast"]').click();
    await expect(card.locator('.mode-tab[data-mode="forecast"]')).toHaveAttribute('aria-selected', 'true');
    const forecast = await embed(embedFrames(card));
    expect(forecast.type).toBe('forecast');
    expect(Number(forecast.params.detailLat)).toBeCloseTo(SPOT_LAT, 5);
    // The lock is map-only by design, so the forecast panel keeps no toggle.
    await expect(card.locator('.static-toggle-button')).toHaveCount(0);

    // And so is the aspect ratio: the forecast is a fixed-layout widget, so 16:9 used to
    // leave it sitting on a block of empty space.
    await expect(card.locator('.iframe-container.ratio-wrapper')).toHaveCount(0);
    const forecastBox = (await embedFrames(card).boundingBox())!;
    expect(forecastBox.height).toBeGreaterThan(100);
    expect(forecastBox.height / forecastBox.width).toBeLessThan(9 / 16);

    expect(consoleErrors).toEqual([]);
  });

  test('comes back after leaving the view and returning', async ({ page }) => {
    // Views are torn out of the DOM on a switch, so the card is constructed
    // again on the way back. A card that does not rebuild its URL comes back as
    // an iframe with an empty src - a blank box - and no unit test sees that,
    // because no unit test destroys and recreates the element inside a real
    // dashboard.
    await page.goto(`/${urlPath}/0`);
    const card = page.locator('windy-card');
    await expect(card.locator('ha-card')).toBeVisible({ timeout: 60_000 });
    const before = await embed(embedFrames(card));

    await page.getByRole('tab', { name: 'Elsewhere' }).click();
    await expect(page.locator('windy-card')).toHaveCount(0);

    await page.getByRole('tab', { name: 'Windy' }).click();
    await expect(card.locator('ha-card')).toBeVisible({ timeout: 30_000 });

    const after = await embeds(card);
    expect(after).toHaveLength(1);
    // Same embed, rebuilt: an empty or half-built src is the failure this test
    // exists for, so compare the whole URL rather than just its presence.
    expect(after[0].src).toBe(before.src);
    await expect(card.locator('.mode-tab')).toHaveCount(2);
    await expect(card.locator('.mode-tab[data-mode="map"]')).toHaveAttribute('aria-selected', 'true');
    await expect(embedFrames(card)).toBeVisible();
  });
});
