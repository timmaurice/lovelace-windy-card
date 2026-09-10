import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'lit';
import '../src/windy-card.js';
import { WindyCard } from '../src/windy-card.js';
import type { WindyCardConfig } from '../src/types.js';

// Minimal HomeAssistant mock
const mockHass = {
  language: 'en',
  config: { latitude: 48.0, longitude: 11.0 },
  states: {} as Record<string, { attributes: Record<string, unknown> }>,
  entities: {},
  localize: () => '',
  locale: { language: 'en' },
  callWS: vi.fn(),
};

function makeCard(config: Partial<WindyCardConfig> = {}): WindyCard {
  const card = new WindyCard();
  card.hass = mockHass as unknown as typeof card.hass;
  card.setConfig({ type: 'custom:windy-card', ...config });
  return card;
}

// Helper: extract the src of the first iframe rendered by the card
function getIframeSrc(card: WindyCard): string {
  // Access private method via cast
  const rendered = (
    card as unknown as { _renderMap: () => { strings: TemplateStringsArray; values: unknown[] } }
  )._renderMap();
  // The URL is always the 2nd value in the lit template (after the ratio wrapper check)
  // Instead, let's use the public render path via shadowRoot after connectedCallback
  // For unit testing URL logic, we test the private method output indirectly via the URL string
  // We'll parse the template values array which contains the URL
  const values = (rendered as unknown as { values: unknown[] }).values;
  // Find the string value that starts with https://
  const url = values.find((v) => typeof v === 'string' && (v as string).startsWith('https://'));
  return url as string;
}

function getForecastIframeSrc(card: WindyCard): string {
  const rendered = (
    card as unknown as { _renderForecast: () => { strings: TemplateStringsArray; values: unknown[] } }
  )._renderForecast();
  const values = rendered.values;
  const url = values.find((v) => typeof v === 'string' && (v as string).startsWith('https://'));
  return url as string;
}

/** Renders the whole card into a detached container, so attributes and rows can be read. */
function renderCard(card: WindyCard): HTMLElement {
  const container = document.createElement('div');
  render((card as unknown as { render: () => unknown }).render(), container);
  return container;
}

describe('WindyCard', () => {
  describe('getStubConfig()', () => {
    it('returns a valid stub config', () => {
      const stub = WindyCard.getStubConfig();
      expect(stub.type).toBeUndefined(); // type is added by HA
      expect(stub.overlay).toBe('wind');
      expect(stub.zoom).toBe(5);
      expect(stub.aspect_ratio).toBe('16:9');
      expect(stub.metric_temp).toBe('default');
    });
  });

  describe('getCardSize()', () => {
    it('returns 10', () => {
      const card = makeCard();
      expect(card.getCardSize()).toBe(10);
    });
  });

  describe('setConfig()', () => {
    it('throws on falsy config', () => {
      const card = new WindyCard();
      expect(() => card.setConfig(null as unknown as WindyCardConfig)).toThrow('Invalid configuration');
    });

    it('sets default_mode from config', () => {
      const card = makeCard({ default_mode: 'forecast' });
      // _mode is private but we can verify via render (no hass → empty)
      // Just ensure setConfig doesn't throw
      expect(card).toBeTruthy();
    });
  });

  describe('URL generation — zoom clamping', () => {
    it('clamps zoom below 3 to 3', () => {
      const card = makeCard({ zoom: 0, overlay: 'wind' });
      const src = getIframeSrc(card);
      expect(src).toContain('zoom=3');
    });

    it('clamps zoom above 11 to 11', () => {
      const card = makeCard({ zoom: 99, overlay: 'wind' });
      const src = getIframeSrc(card);
      expect(src).toContain('zoom=11');
    });

    it('uses zoom value within range as-is', () => {
      const card = makeCard({ zoom: 7, overlay: 'wind' });
      const src = getIframeSrc(card);
      expect(src).toContain('zoom=7');
    });
  });

  describe('URL generation — overlay & product', () => {
    it('omits product for radar overlay', () => {
      const card = makeCard({ overlay: 'radar' });
      const src = getIframeSrc(card);
      expect(src).toContain('overlay=radar');
      expect(src).not.toContain('product=');
    });

    it('omits product for satellite overlay', () => {
      const card = makeCard({ overlay: 'satellite' });
      const src = getIframeSrc(card);
      expect(src).not.toContain('product=');
    });

    it('omits product for case-insensitive satellite overlay', () => {
      const card = makeCard({ overlay: 'Satellite' });
      const src = getIframeSrc(card);
      expect(src).not.toContain('product=');
    });

    it('omits product for case-insensitive radar overlay', () => {
      const card = makeCard({ overlay: 'Radar' });
      const src = getIframeSrc(card);
      expect(src).not.toContain('product=');
    });

    it('includes product for wind overlay', () => {
      const card = makeCard({ overlay: 'wind', product: 'gfs' });
      const src = getIframeSrc(card);
      expect(src).toContain('product=gfs');
    });

    it('includes product for wind overlay (UKV)', () => {
      const card = makeCard({ overlay: 'wind', product: 'ukv' });
      const src = getIframeSrc(card);
      expect(src).toContain('product=ukv');
    });

    it('includes product for wind overlay (ACCESS)', () => {
      const card = makeCard({ overlay: 'wind', product: 'bomAccess' });
      const src = getIframeSrc(card);
      expect(src).toContain('product=bomAccess');
    });

    it('defaults product to ecmwf', () => {
      const card = makeCard({ overlay: 'wind' });
      const src = getIframeSrc(card);
      expect(src).toContain('product=ecmwf');
    });

    it('falls back to ecmwf for rainAccu when product is unsupported', () => {
      const card = makeCard({ overlay: 'rainAccu', product: 'icon' });
      const src = getIframeSrc(card);
      expect(src).toContain('product=ecmwf');
    });

    it('allows gfs for rainAccu since it is supported', () => {
      const card = makeCard({ overlay: 'rainAccu', product: 'gfs' });
      const src = getIframeSrc(card);
      expect(src).toContain('product=gfs');
    });

    it('resolves rainAccu overlay with correct camelCase', () => {
      const card1 = makeCard({ overlay: 'rainAccu' });
      expect(getIframeSrc(card1)).toContain('overlay=rainAccu');

      const card2 = makeCard({ overlay: 'raincum' }); // legacy
      expect(getIframeSrc(card2)).toContain('overlay=rainAccu');

      const card3 = makeCard({ overlay: 'RAINACCU' }); // case-insensitive modern
      expect(getIframeSrc(card3)).toContain('overlay=rainAccu');
    });

    it('resolves snowAccu and gustAccu overlays with correct camelCase', () => {
      const card1 = makeCard({ overlay: 'snowAccu' });
      expect(getIframeSrc(card1)).toContain('overlay=snowAccu');

      const card2 = makeCard({ overlay: 'snow' }); // legacy
      expect(getIframeSrc(card2)).toContain('overlay=snowAccu');

      const card3 = makeCard({ overlay: 'gustAccu' });
      expect(getIframeSrc(card3)).toContain('overlay=gustAccu');

      const card4 = makeCard({ overlay: 'windcum' }); // legacy
      expect(getIframeSrc(card4)).toContain('overlay=gustAccu');
    });

    it('resolves currentsTide and other camelCase fixed product overlays, omitting product', () => {
      const card1 = makeCard({ overlay: 'currentsTide', product: 'gfs' });
      const src1 = getIframeSrc(card1);
      expect(src1).toContain('overlay=currentsTide');
      expect(src1).not.toContain('product=');

      const card2 = makeCard({ overlay: 'CURRENTSTIDE', product: 'gfs' });
      const src2 = getIframeSrc(card2);
      expect(src2).toContain('overlay=currentsTide');
      expect(src2).not.toContain('product=');
    });
  });

  describe('URL generation — forecast product', () => {
    it('uses forecast_product when provided', () => {
      const card = makeCard({ forecast_product: 'iconD2' });
      const src = getForecastIframeSrc(card);
      expect(src).toContain('product=iconD2');
    });

    it('uses forecast_product when provided (UKV)', () => {
      const card = makeCard({ forecast_product: 'ukv' });
      const src = getForecastIframeSrc(card);
      expect(src).toContain('product=ukv');
    });

    it('uses forecast_product when provided (ACCESS)', () => {
      const card = makeCard({ forecast_product: 'bomAccess' });
      const src = getForecastIframeSrc(card);
      expect(src).toContain('product=bomAccess');
    });

    it('falls back to product when forecast_product is absent', () => {
      const card = makeCard({ product: 'gfs' });
      const src = getForecastIframeSrc(card);
      expect(src).toContain('product=gfs');
    });

    it('defaults to ecmwf when both product and forecast_product are absent', () => {
      const card = makeCard();
      const src = getForecastIframeSrc(card);
      expect(src).toContain('product=ecmwf');
    });
  });

  describe('URL generation — elevation level', () => {
    it('includes level for wind overlay', () => {
      const card = makeCard({ overlay: 'wind', level: '850h' });
      const src = getIframeSrc(card);
      expect(src).toContain('level=850h');
    });

    it('forces level=surface for rain overlay (no elevation support)', () => {
      const card = makeCard({ overlay: 'rain', level: '850h' });
      const src = getIframeSrc(card);
      expect(src).toContain('level=surface');
    });
  });

  describe('URL generation — marker and spot', () => {
    it('includes marker params when show_marker is true', () => {
      const card = makeCard({ overlay: 'wind', latitude: 48.1, longitude: 11.5, show_marker: true });
      const src = getIframeSrc(card);
      expect(src).toContain('marker=true');
      expect(src).toContain('detailLat=48.1');
      expect(src).toContain('detailLon=11.5');
    });

    it('omits marker params when show_marker is false', () => {
      const card = makeCard({ overlay: 'wind', show_marker: false });
      const src = getIframeSrc(card);
      expect(src).not.toContain('marker=true');
    });

    it('includes detail params when show_spot is true', () => {
      const card = makeCard({ overlay: 'wind', latitude: 47.0, longitude: 10.0, show_spot: true });
      const src = getIframeSrc(card);
      expect(src).toContain('detail=true');
      expect(src).toContain('detailLat=47');
    });
  });

  describe('URL generation — pressure', () => {
    it('includes pressure param when show_pressure is true and overlay is wind', () => {
      const card = makeCard({ overlay: 'wind', show_pressure: true });
      const src = getIframeSrc(card);
      expect(src).toContain('pressure=true');
    });

    it('omits pressure param for radar even when show_pressure is true', () => {
      const card = makeCard({ overlay: 'radar', show_pressure: true });
      const src = getIframeSrc(card);
      expect(src).not.toContain('pressure=true');
    });
  });

  describe('URL generation — autoplay', () => {
    it('includes play param when autoplay is true', () => {
      const card = makeCard({ overlay: 'wind', autoplay: true });
      const src = getIframeSrc(card);
      expect(src).toContain('&play=true');
    });

    it('omits play param when autoplay is false or absent', () => {
      const card = makeCard({ overlay: 'wind', autoplay: false });
      const src = getIframeSrc(card);
      expect(src).not.toContain('&play=true');

      const card2 = makeCard({ overlay: 'wind' });
      const src2 = getIframeSrc(card2);
      expect(src2).not.toContain('&play=true');
    });
  });

  describe('URL generation — location resolution', () => {
    it('uses explicit latitude/longitude', () => {
      const card = makeCard({ overlay: 'wind', latitude: 52.5, longitude: 13.4 });
      const src = getIframeSrc(card);
      expect(src).toContain('lat=52.5');
      expect(src).toContain('lon=13.4');
    });

    it('falls back to hass config location when no lat/lon set', () => {
      const card = makeCard({ overlay: 'wind' });
      const src = getIframeSrc(card);
      expect(src).toContain('lat=48');
      expect(src).toContain('lon=11');
    });

    it('uses location when location is set', () => {
      const card = new WindyCard();
      const hassWithZone = {
        ...mockHass,
        states: {
          'zone.home': {
            attributes: { latitude: 53.0, longitude: 9.0 },
          },
        },
      };
      card.hass = hassWithZone as unknown as typeof card.hass;
      card.setConfig({ type: 'custom:windy-card', overlay: 'wind', location: 'zone.home' });
      const src = getIframeSrc(card);
      expect(src).toContain('lat=53');
      expect(src).toContain('lon=9');
    });

    it('falls back to lat/lon when zone entity is missing from states', () => {
      const card = makeCard({ overlay: 'wind', location: 'zone.nonexistent', latitude: 51.0, longitude: 7.0 });
      const src = getIframeSrc(card);
      expect(src).toContain('lat=51');
      expect(src).toContain('lon=7');
    });
  });

  describe('URL generation — metrics', () => {
    it('uses default metrics when not configured', () => {
      const card = makeCard({ overlay: 'wind' });
      const src = getIframeSrc(card);
      expect(src).toContain('metricTemp=default');
      expect(src).toContain('metricRain=default');
      expect(src).toContain('metricWind=default');
    });

    it('uses configured metric values', () => {
      const card = makeCard({ overlay: 'wind', metric_temp: '°C', metric_rain: 'mm', metric_wind: 'km/h' });
      // Read back through URL, not by substring: the degree sign and the slash are
      // percent-encoded in the query, and what matters is the value Windy decodes.
      const params = new URL(getIframeSrc(card)).searchParams;
      expect(params.get('metricTemp')).toBe('°C');
      expect(params.get('metricRain')).toBe('mm');
      expect(params.get('metricWind')).toBe('km/h');
    });
  });

  describe('URL generation — encoding', () => {
    it('encodes values that are not URL-safe', () => {
      const card = makeCard({ overlay: 'wind', metric_temp: '°C', metric_wind: 'm/s' });
      const src = getIframeSrc(card);

      // Raw in the query string these end the parameter early or change its meaning.
      expect(src).not.toContain('°C');
      expect(src).not.toContain('m/s');
      expect(new URL(src).searchParams.get('metricWind')).toBe('m/s');
    });

    it('keeps a value with a separator in it from becoming another parameter', () => {
      const card = makeCard({ overlay: 'wind&pressure=true&zoom=11' });
      const params = new URL(getIframeSrc(card)).searchParams;

      expect(params.get('overlay')).toBe('wind&pressure=true&zoom=11');
      expect(params.get('pressure')).toBeNull();
      expect(params.get('zoom')).toBe('5');
    });

    it('encodes the forecast parameters too', () => {
      const card = makeCard({ metric_wind: 'm/s' });
      const src = getForecastIframeSrc(card);

      expect(src).not.toContain('m/s');
      expect(new URL(src).searchParams.get('metricWind')).toBe('m/s');
    });
  });

  describe('URL generation — lang', () => {
    it('includes lang parameter based on HASS language', () => {
      const card = makeCard({ overlay: 'wind' });
      let src = getIframeSrc(card);
      expect(src).toContain('lang=en');

      card.hass = { ...mockHass, language: 'de' } as unknown as typeof card.hass;
      (card as unknown as { _updateUrls: (force: boolean) => void })._updateUrls(true);
      src = getIframeSrc(card);
      expect(src).toContain('lang=de');

      const forecastSrc = getForecastIframeSrc(card);
      expect(forecastSrc).toContain('lang=de');
    });
  });

  describe('aspect ratio', () => {
    it('returns correct padding for 16:9', () => {
      const card = makeCard({ overlay: 'wind', aspect_ratio: '16:9' });
      const getRatioPadding = (card as unknown as { _getRatioPadding: () => string | null })._getRatioPadding;
      const padding = getRatioPadding.call(card);
      expect(padding).toBe('56.2500%');
    });

    it('returns correct padding for 4:3', () => {
      const card = makeCard({ overlay: 'wind', aspect_ratio: '4:3' });
      const getRatioPadding = (card as unknown as { _getRatioPadding: () => string | null })._getRatioPadding;
      const padding = getRatioPadding.call(card);
      expect(padding).toBe('75.0000%');
    });

    it('returns null for empty aspect_ratio', () => {
      const card = makeCard({ overlay: 'wind', aspect_ratio: '' });
      const getRatioPadding = (card as unknown as { _getRatioPadding: () => string | null })._getRatioPadding;
      const padding = getRatioPadding.call(card);
      expect(padding).toBeNull();
    });

    it('returns null when aspect_ratio is not set', () => {
      const card = makeCard({ overlay: 'wind' });
      const getRatioPadding = (card as unknown as { _getRatioPadding: () => string | null })._getRatioPadding;
      const padding = getRatioPadding.call(card);
      expect(padding).toBeNull();
    });
  });

  describe('render wrappers', () => {
    it('adds a reset button for the map view', () => {
      const card = makeCard({ overlay: 'wind' });
      // We can inspect the strings of the lit HtmlTemplate since it contains the static DOM
      const rendered = (
        card as unknown as { _renderMap: () => { strings: TemplateStringsArray; values: unknown[] } }
      )._renderMap();

      // Depending on whether _renderMap returns a wrapper (due to aspect ratio or height)
      // the string will vary, but both wrapper versions now use the reset button logic
      // In this case, `values` contains the resetButton html piece which we need to check inside

      const values = rendered.values;
      const hasResetButtonValue = values.some((val) => {
        // Evaluate if one of the sub-templates has a reset-button
        if (val && typeof val === 'object' && 'strings' in val) {
          return (val as { strings: TemplateStringsArray }).strings.join(' ').includes('reset-button');
        }
        return false;
      });

      expect(hasResetButtonValue).toBe(true);
    });

    it('does not add a reset button for the forecast view', () => {
      const card = makeCard({ overlay: 'wind' });
      const rendered = (
        card as unknown as { _renderForecast: () => { strings: TemplateStringsArray; values: unknown[] } }
      )._renderForecast();

      const values = rendered.values;
      const hasResetButtonValue = values.some((val) => {
        if (val && typeof val === 'object' && 'strings' in val) {
          return (val as { strings: TemplateStringsArray }).strings.join(' ').includes('reset-button');
        }
        return false;
      });

      expect(hasResetButtonValue).toBe(false);
    });
  });

  describe('overlay_entity resolution', () => {
    function makeCardWith(states: Record<string, unknown>, config: Partial<WindyCardConfig>): WindyCard {
      const card = new WindyCard();
      card.hass = { ...mockHass, states } as unknown as typeof card.hass;
      card.setConfig({ type: 'custom:windy-card', ...config });
      return card;
    }

    // `unavailable`/`unknown` are Home Assistant saying "no value". Sent on as a layer
    // name they leave the Windy map blank, which looks like a broken card.
    it.each(['unavailable', 'unknown'])('keeps the configured layer while the entity state is %s', (state) => {
      const card = makeCardWith(
        { 'sensor.layer': { entity_id: 'sensor.layer', state, attributes: {} } },
        { overlay: 'rain', overlay_entity: 'sensor.layer' },
      );
      const src = getIframeSrc(card);

      expect(src).toContain('overlay=rain');
      expect(src).not.toContain(`overlay=${state}`);
    });

    it('keeps the configured layer while the entity has no state at all', () => {
      const card = makeCardWith(
        { 'sensor.layer': { entity_id: 'sensor.layer', state: '', attributes: {} } },
        { overlay: 'rain', overlay_entity: 'sensor.layer' },
      );
      expect(getIframeSrc(card)).toContain('overlay=rain');
    });

    it('keeps the configured layer when the state is not a Windy layer at all', () => {
      const card = makeCardWith(
        { 'binary_sensor.window': { entity_id: 'binary_sensor.window', state: 'on', attributes: {} } },
        { overlay: 'rain', overlay_entity: 'binary_sensor.window' },
      );
      expect(getIframeSrc(card)).toContain('overlay=rain');
    });

    it('keeps the configured layer when the entity does not exist', () => {
      const card = makeCardWith({}, { overlay: 'rain', overlay_entity: 'sensor.gone' });
      expect(getIframeSrc(card)).toContain('overlay=rain');
    });

    it('follows a usable state, aliases included', () => {
      const clouds = makeCardWith(
        { 'sensor.layer': { entity_id: 'sensor.layer', state: 'clouds', attributes: {} } },
        { overlay: 'rain', overlay_entity: 'sensor.layer' },
      );
      expect(getIframeSrc(clouds)).toContain('overlay=clouds');

      const legacy = makeCardWith(
        { 'sensor.layer': { entity_id: 'sensor.layer', state: 'cat', attributes: {} } },
        { overlay: 'rain', overlay_entity: 'sensor.layer' },
      );
      expect(getIframeSrc(legacy)).toContain('overlay=turbulence');
    });

    it('reports the unusable entity instead of failing silently', () => {
      const card = makeCardWith(
        { 'sensor.layer': { entity_id: 'sensor.layer', state: 'unavailable', attributes: {} } },
        { overlay: 'rain', overlay_entity: 'sensor.layer' },
      );
      const problems = renderCard(card).querySelectorAll('.entity-problem');

      expect(problems).toHaveLength(1);
      expect(problems[0].textContent).toContain('sensor.layer');
    });

    it('names the useless value when the state is not a layer', () => {
      const card = makeCardWith(
        { 'binary_sensor.window': { entity_id: 'binary_sensor.window', state: 'on', attributes: {} } },
        { overlay_entity: 'binary_sensor.window' },
      );
      const problem = renderCard(card).querySelector('.entity-problem');

      expect(problem?.textContent).toContain('binary_sensor.window');
      expect(problem?.textContent).toContain('on');
    });

    it('stays quiet while the overlay loop overrides the entity anyway', () => {
      const card = makeCardWith(
        { 'sensor.layer': { entity_id: 'sensor.layer', state: 'unavailable', attributes: {} } },
        { overlay_entity: 'sensor.layer', overlay_loop: ['wind', 'rain'] },
      );
      expect(renderCard(card).querySelectorAll('.entity-problem')).toHaveLength(0);
    });

    it('reports a location entity that carries no coordinates', () => {
      const card = makeCardWith(
        { 'zone.nowhere': { entity_id: 'zone.nowhere', state: 'zoning', attributes: {} } },
        { location: 'zone.nowhere' },
      );
      const problem = renderCard(card).querySelector('.entity-problem');

      expect(problem?.textContent).toContain('zone.nowhere');
    });

    it('paints no problem row when every configured entity resolves', () => {
      const card = makeCardWith(
        {
          'sensor.layer': { entity_id: 'sensor.layer', state: 'clouds', attributes: {} },
          'zone.spot': { entity_id: 'zone.spot', state: 'zoning', attributes: { latitude: 1, longitude: 2 } },
        },
        { overlay_entity: 'sensor.layer', location: 'zone.spot' },
      );
      expect(renderCard(card).querySelectorAll('.entity-problem')).toHaveLength(0);
    });
  });

  describe('aspect ratio applies to the map only', () => {
    function renderPanel(card: WindyCard, mode: 'map' | 'forecast'): HTMLElement {
      const container = document.createElement('div');
      const method = mode === 'map' ? '_renderMap' : '_renderForecast';
      render((card as unknown as Record<string, () => unknown>)[method](), container);
      return container;
    }

    it('wraps the map in the ratio wrapper', () => {
      const container = renderPanel(makeCard({ aspect_ratio: '16:9' }), 'map');
      expect(container.querySelector('.iframe-container.ratio-wrapper')).not.toBeNull();
    });

    // The forecast is a fixed-layout widget - given the map's ratio it just gained a
    // margin of empty space below it.
    it('leaves the forecast at its own height', () => {
      const container = renderPanel(makeCard({ aspect_ratio: '16:9' }), 'forecast');

      expect(container.querySelector('.ratio-wrapper')).toBeNull();
      expect(container.querySelector('iframe')?.getAttribute('height')).toBe('185');
    });

    it('still honours an explicit height on the forecast', () => {
      const container = renderPanel(makeCard({ aspect_ratio: '16:9', height: 320 }), 'forecast');
      expect(container.querySelector('iframe')?.getAttribute('height')).toBe('320');
    });
  });

  describe('accessible names', () => {
    function renderPanel(card: WindyCard, mode: 'map' | 'forecast' = 'map'): HTMLElement {
      const container = document.createElement('div');
      const method = mode === 'map' ? '_renderMap' : '_renderForecast';
      render((card as unknown as Record<string, () => unknown>)[method](), container);
      return container;
    }

    // Icon-only buttons announce as "button" and nothing else without a label.
    it('labels every toolbar button', () => {
      const container = renderPanel(makeCard({ static_map: true }));

      for (const selector of ['.reset-button', '.static-toggle-button', '.fullscreen-button']) {
        const button = container.querySelector(selector);
        expect(button, selector).not.toBeNull();
        expect(button?.getAttribute('aria-label'), selector).toBeTruthy();
      }
    });

    it('says which way the two toggles stand', () => {
      const locked = renderPanel(makeCard({ static_map: true }));
      expect(locked.querySelector('.static-toggle-button')?.getAttribute('aria-pressed')).toBe('true');
      expect(locked.querySelector('.fullscreen-button')?.getAttribute('aria-pressed')).toBe('false');

      const unlocked = renderPanel(makeCard({}));
      expect(unlocked.querySelector('.static-toggle-button')?.getAttribute('aria-pressed')).toBe('false');
    });

    // Hardcoded English is what the localize() call exists to avoid.
    it('titles both frames from the translations', () => {
      const card = makeCard({});
      card.hass = { ...mockHass, language: 'de' } as unknown as typeof card.hass;

      expect(renderPanel(card, 'map').querySelector('iframe')?.getAttribute('title')).toBe('Windy-Karte');
      expect(renderPanel(card, 'forecast').querySelector('iframe')?.getAttribute('title')).toBe('Windy-Ortsvorhersage');
    });
  });

  describe('customCards registration', () => {
    it('registers the card in window.customCards', () => {
      expect(window.customCards.some((c) => c.type === 'windy-card')).toBe(true);
    });

    it('registered card has name, description, and documentationURL', () => {
      const entry = window.customCards.find((c) => c.type === 'windy-card');
      expect(entry?.name).toBe('Windy Card');
      expect(entry?.description).toBeTruthy();
      expect(entry?.documentationURL).toBe('https://github.com/timmaurice/lovelace-windy-card');
    });
  });

  describe('Modes and Padding', () => {
    it('sets isMapOnly when default_mode is map_only', () => {
      const card = makeCard({ default_mode: 'map_only' });
      const isMapOnly = (card as unknown as { _isMapOnly: boolean })._isMapOnly;
      expect(isMapOnly).toBe(true);
    });

    it('sets isForecastOnly when default_mode is forecast_only', () => {
      const card = makeCard({ default_mode: 'forecast_only' });
      const isForecastOnly = (card as unknown as { _isForecastOnly: boolean })._isForecastOnly;
      expect(isForecastOnly).toBe(true);
    });

    it('identifies no_padding correctly', () => {
      const card = makeCard({ default_mode: 'map_only', no_padding: true });
      // We can't easily check the private render logic here without full DOM,
      // but we can check if the config is correctly stored
      expect((card as unknown as { _config: WindyCardConfig })._config.no_padding).toBe(true);
    });
  });

  describe('allow_geolocation', () => {
    // Sniffing the template's `values` array cannot see attributes — render and read the DOM.
    function renderIframe(card: WindyCard, mode: 'map' | 'forecast' = 'map'): HTMLIFrameElement | null {
      const method = mode === 'map' ? '_renderMap' : '_renderForecast';
      const template = (card as unknown as Record<string, () => unknown>)[method]();
      const container = document.createElement('div');
      render(template, container);
      return container.querySelector('iframe');
    }

    it('delegates geolocation on the ratio-wrapper branch', () => {
      const card = makeCard({ aspect_ratio: '16:9', allow_geolocation: true });
      expect(renderIframe(card)?.getAttribute('allow')).toBe('geolocation');
    });

    it('delegates geolocation on the fixed-height branch', () => {
      const card = makeCard({ aspect_ratio: '', height: 400, allow_geolocation: true });
      expect(renderIframe(card)?.getAttribute('allow')).toBe('geolocation');
    });

    it('delegates geolocation on the forecast iframe', () => {
      const card = makeCard({ allow_geolocation: true });
      expect(renderIframe(card, 'forecast')?.getAttribute('allow')).toBe('geolocation');
    });

    it('omits the allow attribute when the option is off', () => {
      expect(renderIframe(makeCard({ aspect_ratio: '16:9' }))?.hasAttribute('allow')).toBe(false);
      expect(renderIframe(makeCard({ aspect_ratio: '', height: 400 }))?.hasAttribute('allow')).toBe(false);
      expect(renderIframe(makeCard({ allow_geolocation: false }))?.hasAttribute('allow')).toBe(false);
    });
  });

  describe('allow_geolocation — insecure context warning', () => {
    // jsdom does not define isSecureContext at all, so every case sets it explicitly.
    function setSecureContext(value: boolean): void {
      Object.defineProperty(window, 'isSecureContext', { value, configurable: true });
    }

    afterEach(() => {
      setSecureContext(true);
      vi.restoreAllMocks();
    });

    it('warns when the option is on but the context is not secure', () => {
      setSecureContext(false);
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      makeCard({ allow_geolocation: true });
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('allow_geolocation');
      expect(warn.mock.calls[0][0]).toContain('secure context');
    });

    it('stays silent in a secure context', () => {
      setSecureContext(true);
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      makeCard({ allow_geolocation: true });
      expect(warn).not.toHaveBeenCalled();
    });

    it('stays silent when the option is off, however insecure the context', () => {
      setSecureContext(false);
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      makeCard({});
      makeCard({ allow_geolocation: false });
      expect(warn).not.toHaveBeenCalled();
    });

    it('warns only once per card, not on every setConfig', () => {
      setSecureContext(false);
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const card = makeCard({ allow_geolocation: true });
      card.setConfig({ type: 'custom:windy-card', allow_geolocation: true, zoom: 8 });
      card.setConfig({ type: 'custom:windy-card', allow_geolocation: true, zoom: 9 });
      card.connectedCallback();
      expect(warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility & Keyboard', () => {
    it('switches to forecast on ArrowRight', () => {
      const card = makeCard({ default_mode: 'map' });
      const handleKeyDown = (
        card as unknown as { _handleTabKeyDown: (ev: Partial<KeyboardEvent>) => void }
      )._handleTabKeyDown.bind(card);
      handleKeyDown({ key: 'ArrowRight', preventDefault: vi.fn() } as unknown as KeyboardEvent);
      expect((card as unknown as { _mode: string })._mode).toBe('forecast');
    });

    it('switches back to map on ArrowLeft', () => {
      const card = makeCard({ default_mode: 'forecast' });
      const handleKeyDown = (
        card as unknown as { _handleTabKeyDown: (ev: Partial<KeyboardEvent>) => void }
      )._handleTabKeyDown.bind(card);
      handleKeyDown({ key: 'ArrowLeft', preventDefault: vi.fn() } as unknown as KeyboardEvent);
      expect((card as unknown as { _mode: string })._mode).toBe('map');
    });

    it('wraps around from forecast to map on ArrowRight', () => {
      const card = makeCard({ default_mode: 'forecast' });
      const handleKeyDown = (
        card as unknown as { _handleTabKeyDown: (ev: Partial<KeyboardEvent>) => void }
      )._handleTabKeyDown.bind(card);
      handleKeyDown({ key: 'ArrowRight', preventDefault: vi.fn() } as unknown as KeyboardEvent);
      expect((card as unknown as { _mode: string })._mode).toBe('map');
    });

    it('goes to first tab on Home', () => {
      const card = makeCard({ default_mode: 'forecast' });
      const handleKeyDown = (
        card as unknown as { _handleTabKeyDown: (ev: Partial<KeyboardEvent>) => void }
      )._handleTabKeyDown.bind(card);
      handleKeyDown({ key: 'Home', preventDefault: vi.fn() } as unknown as KeyboardEvent);
      expect((card as unknown as { _mode: string })._mode).toBe('map');
    });

    it('goes to last tab on End', () => {
      const card = makeCard({ default_mode: 'map' });
      const handleKeyDown = (
        card as unknown as { _handleTabKeyDown: (ev: Partial<KeyboardEvent>) => void }
      )._handleTabKeyDown.bind(card);
      handleKeyDown({ key: 'End', preventDefault: vi.fn() } as unknown as KeyboardEvent);
      expect((card as unknown as { _mode: string })._mode).toBe('forecast');
    });
  });

  describe('Interaction & Static Map', () => {
    it('initializes _isStatic from config', () => {
      const card = makeCard({ static_map: true });
      expect((card as unknown as { _isStatic: boolean })._isStatic).toBe(true);
    });

    it('toggles _isStatic when _toggleStatic is called', () => {
      const card = makeCard({ static_map: false });
      const toggle = (card as unknown as { _toggleStatic: (ev: Partial<Event>) => void })._toggleStatic.bind(card);
      toggle({ preventDefault: vi.fn() } as unknown as Event);
      expect((card as unknown as { _isStatic: boolean })._isStatic).toBe(true);
      toggle({ preventDefault: vi.fn() } as unknown as Event);
      expect((card as unknown as { _isStatic: boolean })._isStatic).toBe(false);
    });

    it('applies pointer-events: none to iframe when _isStatic is true', () => {
      const card = makeCard({ static_map: true });
      const rendered = (
        card as unknown as { _renderMap: () => { strings: TemplateStringsArray; values: unknown[] } }
      )._renderMap();

      // The pointerEvents string is in the values array if it's rendered into the style attribute
      const hasPointerEventsNone = rendered.values.some(
        (val) => typeof val === 'string' && val.includes('pointer-events: none;'),
      );
      expect(hasPointerEventsNone).toBe(true);
    });

    it('does not apply pointer-events: none to the forecast iframe when _isStatic is true', () => {
      const card = makeCard({ static_map: true });
      const rendered = (
        card as unknown as { _renderForecast: () => { strings: TemplateStringsArray; values: unknown[] } }
      )._renderForecast();

      const hasPointerEventsNone = rendered.values.some(
        (val) => typeof val === 'string' && val.includes('pointer-events: none;'),
      );
      expect(hasPointerEventsNone).toBe(false);
    });

    it('does not render the interaction lock toggle on the forecast panel', () => {
      const card = makeCard({ static_map: true });
      const rendered = (
        card as unknown as { _renderForecast: () => { strings: TemplateStringsArray; values: unknown[] } }
      )._renderForecast();

      const toggleButtonTemplate = rendered.values.find(
        (val) =>
          val &&
          typeof val === 'object' &&
          'strings' in val &&
          (val as { strings: TemplateStringsArray }).strings.join(' ').includes('static-toggle-button'),
      );

      expect(toggleButtonTemplate).toBeFalsy();
    });

    it('renders the lock icon based on _isStatic state', () => {
      const card = makeCard({ static_map: true });
      const rendered = (
        card as unknown as { _renderMap: () => { strings: TemplateStringsArray; values: unknown[] } }
      )._renderMap();

      // The toggleStaticButton is a TemplateResult in the values
      const toggleButtonTemplate = rendered.values.find(
        (val) =>
          val &&
          typeof val === 'object' &&
          'strings' in val &&
          (val as { strings: TemplateStringsArray }).strings.join(' ').includes('static-toggle-button'),
      );

      expect(toggleButtonTemplate).toBeTruthy();
      const values = (toggleButtonTemplate as { values: unknown[] }).values;

      // When _isStatic is true, it should show mdi:lock
      expect(values).toContain('mdi:lock');
    });
  });

  describe('Fullscreen', () => {
    // Finds the sub-template of a rendered wrapper whose markup contains `needle`
    const findSubTemplate = (rendered: { values: unknown[] }, needle: string) =>
      rendered.values.find(
        (val) =>
          val &&
          typeof val === 'object' &&
          'strings' in val &&
          (val as { strings: TemplateStringsArray }).strings.join(' ').includes(needle),
      ) as { values: unknown[] } | undefined;

    const renderMap = (card: WindyCard) =>
      (card as unknown as { _renderMap: () => { strings: TemplateStringsArray; values: unknown[] } })._renderMap();

    const renderForecast = (card: WindyCard) =>
      (
        card as unknown as { _renderForecast: () => { strings: TemplateStringsArray; values: unknown[] } }
      )._renderForecast();

    const mockEvent = () =>
      ({ preventDefault: vi.fn(), stopPropagation: vi.fn(), currentTarget: null, target: null }) as unknown as Event;

    it('is not fullscreen initially', () => {
      const card = makeCard({ overlay: 'wind' });
      expect((card as unknown as { _isFullscreen: boolean })._isFullscreen).toBe(false);
    });

    it('renders the fullscreen button on the map panel', () => {
      const card = makeCard({ overlay: 'wind' });
      expect(findSubTemplate(renderMap(card), 'fullscreen-button')).toBeTruthy();
    });

    it('does not render the fullscreen button on the forecast panel', () => {
      const card = makeCard({ overlay: 'wind' });
      expect(findSubTemplate(renderForecast(card), 'fullscreen-button')).toBeFalsy();
    });

    it('omits the fullscreen button when hide_fullscreen_button is set', () => {
      const card = makeCard({ overlay: 'wind', hide_fullscreen_button: true });
      expect(findSubTemplate(renderMap(card), 'fullscreen-button')).toBeFalsy();
    });

    it('toggles _isFullscreen from the button', () => {
      const card = makeCard({ overlay: 'wind' });
      const toggle = (card as unknown as { _toggleFullscreen: (ev: Event) => void })._toggleFullscreen.bind(card);

      toggle(mockEvent());
      expect((card as unknown as { _isFullscreen: boolean })._isFullscreen).toBe(true);
      toggle(mockEvent());
      expect((card as unknown as { _isFullscreen: boolean })._isFullscreen).toBe(false);
    });

    it('swaps the button icon while fullscreen', () => {
      const card = makeCard({ overlay: 'wind' });
      expect(findSubTemplate(renderMap(card), 'fullscreen-button')?.values).toContain('mdi:fullscreen');

      (card as unknown as { _isFullscreen: boolean })._isFullscreen = true;
      expect(findSubTemplate(renderMap(card), 'fullscreen-button')?.values).toContain('mdi:fullscreen-exit');
    });

    it('pins the map container to the viewport while fullscreen', () => {
      const card = makeCard({ overlay: 'wind', aspect_ratio: '16:9' });
      expect(renderMap(card).values.some((v) => typeof v === 'string' && v.includes('position: fixed'))).toBe(false);

      (card as unknown as { _isFullscreen: boolean })._isFullscreen = true;
      const values = renderMap(card).values;
      expect(values.some((v) => typeof v === 'string' && v.includes('position: fixed'))).toBe(true);
      expect(values).toContain('fullscreen');
    });

    it('leaves the forecast panel untouched while fullscreen', () => {
      const card = makeCard({ overlay: 'wind' });
      (card as unknown as { _isFullscreen: boolean })._isFullscreen = true;
      expect(renderForecast(card).values.some((v) => typeof v === 'string' && v.includes('position: fixed'))).toBe(
        false,
      );
    });

    it('exits fullscreen on Escape', () => {
      const card = makeCard({ overlay: 'wind' });
      const keyDown = (card as unknown as { _handleFullscreenKeyDown: (ev: KeyboardEvent) => void })
        ._handleFullscreenKeyDown;

      (card as unknown as { _isFullscreen: boolean })._isFullscreen = true;
      keyDown({ key: 'Escape' } as KeyboardEvent);
      expect((card as unknown as { _isFullscreen: boolean })._isFullscreen).toBe(false);
    });

    it('ignores other keys while fullscreen', () => {
      const card = makeCard({ overlay: 'wind' });
      const keyDown = (card as unknown as { _handleFullscreenKeyDown: (ev: KeyboardEvent) => void })
        ._handleFullscreenKeyDown;

      (card as unknown as { _isFullscreen: boolean })._isFullscreen = true;
      keyDown({ key: 'Enter' } as KeyboardEvent);
      expect((card as unknown as { _isFullscreen: boolean })._isFullscreen).toBe(true);
    });

    it('toggles fullscreen on double click', () => {
      const card = makeCard({ overlay: 'wind' });
      const dblClick = (card as unknown as { _handleContainerDblClick: (ev: Event) => void })._handleContainerDblClick;

      dblClick.call(card, mockEvent());
      expect((card as unknown as { _isFullscreen: boolean })._isFullscreen).toBe(true);
      dblClick.call(card, mockEvent());
      expect((card as unknown as { _isFullscreen: boolean })._isFullscreen).toBe(false);
    });

    it('does not toggle on double click when the fullscreen button is hidden', () => {
      const card = makeCard({ overlay: 'wind', hide_fullscreen_button: true });
      const dblClick = (card as unknown as { _handleContainerDblClick: (ev: Event) => void })._handleContainerDblClick;

      dblClick.call(card, mockEvent());
      expect((card as unknown as { _isFullscreen: boolean })._isFullscreen).toBe(false);
    });

    it('ignores double clicks that land on a toolbar button', () => {
      const card = makeCard({ overlay: 'wind' });
      const dblClick = (card as unknown as { _handleContainerDblClick: (ev: Event) => void })._handleContainerDblClick;
      const button = document.createElement('button');
      button.className = 'action-button reset-button';

      dblClick.call(card, { target: button, currentTarget: null } as unknown as Event);
      expect((card as unknown as { _isFullscreen: boolean })._isFullscreen).toBe(false);
    });

    it('leaves fullscreen when the card is removed from the DOM', () => {
      const card = makeCard({ overlay: 'wind' });
      (card as unknown as { _isFullscreen: boolean })._isFullscreen = true;
      card.disconnectedCallback();
      expect((card as unknown as { _isFullscreen: boolean })._isFullscreen).toBe(false);
    });
  });

  describe('Throttling & Refresh Frequency', () => {
    it('applies URL updates immediately on initial load', () => {
      const card = makeCard({ update_interval: 5, latitude: 48.0, longitude: 11.0 });
      const src = getIframeSrc(card);
      expect(src).toContain('lat=48');
      expect(src).toContain('lon=11');
    });

    it('throttles subsequent updates and triggers trailing edge', () => {
      vi.useFakeTimers();
      const card = makeCard({ update_interval: 5, latitude: 48.0, longitude: 11.0 });

      // Simulate a change in hass (e.g. coordinates updated)
      const hassWithNewLocation = {
        ...mockHass,
        states: {
          'zone.home': {
            attributes: { latitude: 53.0, longitude: 9.0 },
          },
        },
      };

      // Set config to track zone.home so coordinate changes can trigger updates
      card.setConfig({
        type: 'custom:windy-card',
        update_interval: 5,
        location: 'zone.home',
      });
      // Force initial load of zone.home
      card.hass = hassWithNewLocation as unknown as typeof card.hass;
      (card as unknown as { performUpdate: () => void }).performUpdate();

      let src = getIframeSrc(card);
      expect(src).toContain('lat=53');
      expect(src).toContain('lon=9');

      // Now update the zone attributes to simulate movement (first update within throttle window)
      hassWithNewLocation.states['zone.home'].attributes = { latitude: 54.0, longitude: 10.0 };
      card.hass = { ...hassWithNewLocation } as unknown as typeof card.hass;
      (card as unknown as { performUpdate: () => void }).performUpdate();

      // The URL should NOT change yet (still lat=53 lon=9) because we are throttled
      src = getIframeSrc(card);
      expect(src).toContain('lat=53');
      expect(src).toContain('lon=9');

      // Another change within throttle window
      hassWithNewLocation.states['zone.home'].attributes = { latitude: 55.0, longitude: 11.0 };
      card.hass = { ...hassWithNewLocation } as unknown as typeof card.hass;
      (card as unknown as { performUpdate: () => void }).performUpdate();

      // Still should not have changed
      src = getIframeSrc(card);
      expect(src).toContain('lat=53');
      expect(src).toContain('lon=9');

      // Fast-forward time by 5 seconds (5000ms) to trigger trailing edge
      vi.advanceTimersByTime(5000);

      // Now it should have updated to the last queued coordinates (lat=55 lon=11)
      src = getIframeSrc(card);
      expect(src).toContain('lat=55');
      expect(src).toContain('lon=11');

      vi.useRealTimers();
    });

    it('bypasses throttle on config change', () => {
      vi.useFakeTimers();
      const card = makeCard({ update_interval: 5, latitude: 48.0, longitude: 11.0 });

      // Change coordinates through config
      card.setConfig({
        type: 'custom:windy-card',
        update_interval: 5,
        latitude: 52.0,
        longitude: 13.0,
      });
      (card as unknown as { performUpdate: () => void }).performUpdate();

      // Should be updated immediately even within the 5s window
      const src = getIframeSrc(card);
      expect(src).toContain('lat=52');
      expect(src).toContain('lon=13');

      vi.useRealTimers();
    });

    it('cancels throttle timer on disconnectedCallback', () => {
      vi.useFakeTimers();
      const card = makeCard({ update_interval: 5, location: 'zone.home' });
      const hassWithNewLocation = {
        ...mockHass,
        states: {
          'zone.home': {
            attributes: { latitude: 53.0, longitude: 9.0 },
          },
        },
      };
      card.hass = hassWithNewLocation as unknown as typeof card.hass;
      (card as unknown as { performUpdate: () => void }).performUpdate();

      // Trigger a throttled update
      hassWithNewLocation.states['zone.home'].attributes = { latitude: 54.0, longitude: 10.0 };
      card.hass = { ...hassWithNewLocation } as unknown as typeof card.hass;
      (card as unknown as { performUpdate: () => void }).performUpdate();

      // Verify timer is set
      const timer = (card as unknown as { _throttleTimer?: ReturnType<typeof setTimeout> })._throttleTimer;
      expect(timer).toBeDefined();

      // Disconnect the card
      card.disconnectedCallback();

      // Timer should be cleared
      expect((card as unknown as { _throttleTimer?: ReturnType<typeof setTimeout> })._throttleTimer).toBeUndefined();

      vi.useRealTimers();
    });
  });

  describe('Overlay loop', () => {
    it('parses overlay_loop from array or comma-separated string', () => {
      const card = makeCard({ overlay_loop: ['wind', 'rain'] });
      expect((card as unknown as { _config: WindyCardConfig })._config.overlay_loop).toEqual(['wind', 'rain']);

      const card2 = makeCard({ overlay_loop: 'wind, rain, temp' as unknown as string[] });
      expect((card2 as unknown as { _config: WindyCardConfig })._config.overlay_loop).toEqual(['wind', 'rain', 'temp']);
    });

    it('sanitizes and defaults overlay_loop_delay', () => {
      const card = makeCard({ overlay_loop_delay: -10 });
      expect((card as unknown as { _config: WindyCardConfig })._config.overlay_loop_delay).toBe(30);

      const card2 = makeCard({ overlay_loop_delay: 15 });
      expect((card2 as unknown as { _config: WindyCardConfig })._config.overlay_loop_delay).toBe(15);
    });

    it('resolves active loop overlay based on _loopIndex', () => {
      const card = makeCard({ overlay_loop: ['wind', 'rain', 'temp'] });

      const getOverlay = (card as unknown as { _getOverlay: () => string })._getOverlay.bind(card);

      expect(getOverlay()).toBe('wind');

      (card as unknown as { _loopIndex: number })._loopIndex = 1;
      expect(getOverlay()).toBe('rain');

      (card as unknown as { _loopIndex: number })._loopIndex = 2;
      expect(getOverlay()).toBe('temp');

      (card as unknown as { _loopIndex: number })._loopIndex = 3;
      expect(getOverlay()).toBe('wind'); // wraps around
    });

    it('sets up a timer to cycle the overlay loop', () => {
      vi.useFakeTimers();
      const card = makeCard({ overlay_loop: ['wind', 'rain'], overlay_loop_delay: 10 });
      card.connectedCallback();

      // Trigger a render/update to ensure willUpdate processes the configuration
      (card as unknown as { performUpdate: () => void }).performUpdate();

      let src = getIframeSrc(card);
      expect(src).toContain('overlay=wind');

      // Fast forward by 10s
      vi.advanceTimersByTime(10000);
      (card as unknown as { performUpdate: () => void }).performUpdate();

      src = getIframeSrc(card);
      expect(src).toContain('overlay=rain');

      // Fast forward by another 10s
      vi.advanceTimersByTime(10000);
      (card as unknown as { performUpdate: () => void }).performUpdate();

      src = getIframeSrc(card);
      expect(src).toContain('overlay=wind');

      card.disconnectedCallback();
      vi.useRealTimers();
    });

    it('clears loop timer on disconnectedCallback', () => {
      vi.useFakeTimers();
      const card = makeCard({ overlay_loop: ['wind', 'rain'], overlay_loop_delay: 10 });
      card.connectedCallback();
      (card as unknown as { performUpdate: () => void }).performUpdate();

      expect((card as unknown as { _loopTimer?: unknown })._loopTimer).toBeDefined();

      card.disconnectedCallback();
      expect((card as unknown as { _loopTimer?: unknown })._loopTimer).toBeUndefined();

      vi.useRealTimers();
    });

    it('resets index and updates loop timer when config changes', () => {
      vi.useFakeTimers();
      const card = makeCard({ overlay_loop: ['wind', 'rain'], overlay_loop_delay: 10 });
      card.connectedCallback();
      (card as unknown as { performUpdate: () => void }).performUpdate();

      (card as unknown as { _loopIndex: number })._loopIndex = 1;

      // Update config with different overlays
      card.setConfig({
        type: 'custom:windy-card',
        overlay_loop: ['temp', 'clouds'],
        overlay_loop_delay: 20,
      });
      (card as unknown as { performUpdate: () => void }).performUpdate();

      // Loop index should be reset to 0
      expect((card as unknown as { _loopIndex: number })._loopIndex).toBe(0);

      const src = getIframeSrc(card);
      expect(src).toContain('overlay=temp');

      // Timer should now fire at 20s
      vi.advanceTimersByTime(20000);
      (card as unknown as { performUpdate: () => void }).performUpdate();

      const src2 = getIframeSrc(card);
      expect(src2).toContain('overlay=clouds');

      card.disconnectedCallback();
      vi.useRealTimers();
    });
  });

  describe('Duplicate resource registration', () => {
    it('should not throw when the bundle is evaluated a second time', async () => {
      vi.resetModules();
      await expect(import('../src/windy-card.js')).resolves.toBeDefined();
    });

    it('should register the card in customCards only once when loaded twice', async () => {
      vi.resetModules();
      await import('../src/windy-card.js');

      const entries = (window.customCards ?? []).filter((card) => card.type === 'windy-card');
      expect(entries).toHaveLength(1);
    });
  });
});
