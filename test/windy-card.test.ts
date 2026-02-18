import { describe, it, expect, vi } from 'vitest';
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
      expect(src).toContain('product=&');
    });

    it('omits product for satellite overlay', () => {
      const card = makeCard({ overlay: 'satellite' });
      const src = getIframeSrc(card);
      expect(src).toContain('product=&');
    });

    it('includes product for wind overlay', () => {
      const card = makeCard({ overlay: 'wind', product: 'gfs' });
      const src = getIframeSrc(card);
      expect(src).toContain('product=gfs');
    });

    it('defaults product to ecmwf', () => {
      const card = makeCard({ overlay: 'wind' });
      const src = getIframeSrc(card);
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

    it('uses zone entity location when zone_entity is set', () => {
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
      card.setConfig({ type: 'custom:windy-card', overlay: 'wind', zone_entity: 'zone.home' });
      const src = getIframeSrc(card);
      expect(src).toContain('lat=53');
      expect(src).toContain('lon=9');
    });

    it('falls back to lat/lon when zone entity is missing from states', () => {
      const card = makeCard({ overlay: 'wind', zone_entity: 'zone.nonexistent', latitude: 51.0, longitude: 7.0 });
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
      const src = getIframeSrc(card);
      expect(src).toContain('metricTemp=°C');
      expect(src).toContain('metricRain=mm');
      expect(src).toContain('metricWind=km/h');
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

  describe('customCards registration', () => {
    it('registers the card in window.customCards', () => {
      expect(window.customCards.some((c) => c.type === 'windy-card')).toBe(true);
    });

    it('registered card has name and description', () => {
      const entry = window.customCards.find((c) => c.type === 'windy-card');
      expect(entry?.name).toBe('Windy Card');
      expect(entry?.description).toBeTruthy();
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
});
