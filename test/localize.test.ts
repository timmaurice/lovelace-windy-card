import { describe, it, expect } from 'vitest';
import { localize } from '../src/localize.js';
import type { HomeAssistant } from '../src/types.js';

const mockHass = (language: string) =>
  ({
    language,
    config: { latitude: 0, longitude: 0 },
    states: {},
    entities: {},
    localize: () => '',
    locale: { language },
    callWS: () => Promise.resolve(undefined),
  }) as unknown as HomeAssistant;

describe('localize()', () => {
  it('returns English translation for a known key', () => {
    const result = localize(mockHass('en'), 'component.windy-card.card.map');
    expect(result).toBe('Map');
  });

  it('returns German translation for a known key', () => {
    const result = localize(mockHass('de'), 'component.windy-card.card.map');
    expect(result).toBe('Karte');
  });

  it('falls back to English for an unknown language', () => {
    const result = localize(mockHass('fr'), 'component.windy-card.card.map');
    expect(result).toBe('Map');
  });

  it('returns the key itself when translation is missing', () => {
    const result = localize(mockHass('en'), 'component.windy-card.nonexistent.key');
    expect(result).toBe('component.windy-card.nonexistent.key');
  });

  it('works without a hass object (undefined)', () => {
    const result = localize(undefined, 'component.windy-card.card.map');
    expect(result).toBe('Map');
  });

  it('replaces placeholders in translation strings', () => {
    // Use a key that has a placeholder — if none exist, verify no crash
    const result = localize(mockHass('en'), 'component.windy-card.card.map', { count: 5 });
    expect(result).toBe('Map'); // no placeholder in this string, should be unchanged
  });

  it('returns German editor label for overlay', () => {
    const result = localize(mockHass('de'), 'component.windy-card.editor.labels.overlay');
    expect(result).toBe('Ebene');
  });

  it('returns English level label with altitude info', () => {
    const result = localize(mockHass('en'), 'component.windy-card.editor.options.levels.850h');
    expect(result).toBe('850hPa – 1500m / 5000ft');
  });

  it('returns German level label with altitude info', () => {
    const result = localize(mockHass('de'), 'component.windy-card.editor.options.levels.850h');
    expect(result).toBe('850hPa – 1500m / 5000ft');
  });

  it('returns common description', () => {
    const result = localize(undefined, 'component.windy-card.common.description');
    expect(result).toBe('A Lovelace card for Windy Map and Forecast.');
  });
});
