import { describe, it, expect, vi } from 'vitest';
import '../src/editor.js';
import { WindyCardEditor } from '../src/editor.js';
import { WindyCardConfig, HomeAssistant, HaFormSchema } from '../src/types.js';

const mockHass = {
  language: 'en',
  localize: (key: string) => key,
};

function makeEditor(config: Partial<WindyCardConfig> = {}): WindyCardEditor {
  const editor = new WindyCardEditor();
  editor.hass = mockHass as unknown as HomeAssistant;
  editor.setConfig({ type: 'custom:windy-card', ...config });
  return editor;
}

describe('WindyCardEditor', () => {
  describe('_getSchema()', () => {
    it('returns elevation level selector for wind overlay', () => {
      const editor = makeEditor({ overlay: 'wind' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();

      // Check if any element in schema has name 'level'
      // The schema is nested because of 'expandable' and 'grid' types
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'level')).toBe(true);
    });

    // The dropdown writes Windy's canonical ids, so those are the ones the schema has
    // to recognise - it used to test for the retired aliases and hid the selector for
    // exactly the two layers that reach it under a new name.
    it.each(['turbulence', 'cape'])('returns elevation level selector for the %s overlay', (overlay) => {
      const editor = makeEditor({ overlay });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'level')).toBe(true);
    });

    // A config written before the rename still says cat/cap, and it still means the same layer.
    it.each(['cat', 'cap'])('returns elevation level selector for the legacy %s overlay', (overlay) => {
      const editor = makeEditor({ overlay });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'level')).toBe(true);
    });

    it('hides elevation level selector for radar overlay', () => {
      const editor = makeEditor({ overlay: 'radar' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'level')).toBe(false);
    });

    it('hides product selector for radar overlay', () => {
      const editor = makeEditor({ overlay: 'radar' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'product')).toBe(false);
    });

    // These layers come from one fixed source. The card drops `product` from the URL for
    // them, so offering the dropdown only promises a choice that has no effect.
    it.each(['fwi', 'sst', 'pm2p5', 'capAlerts', 'currentsTide'])(
      'hides the product selector for the fixed-product %s overlay',
      (overlay) => {
        const editor = makeEditor({ overlay });
        const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
        const flatSchema = flattenSchema(schema);
        expect(flatSchema.some((s) => s.name === 'product')).toBe(false);
      },
    );

    it('offers the product selector for a model-driven overlay', () => {
      const editor = makeEditor({ overlay: 'wind' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'product')).toBe(true);
    });

    it('hides map options when in forecast_only mode', () => {
      const editor = makeEditor({ default_mode: 'forecast_only' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);

      expect(flatSchema.some((s) => s.name === 'zoom')).toBe(false);
      expect(flatSchema.some((s) => s.name === 'overlay')).toBe(false);
      expect(flatSchema.some((s) => s.name === 'show_marker')).toBe(false);
      expect(flatSchema.some((s) => s.name === 'hide_fullscreen_button')).toBe(false);
    });

    it('offers the hide_fullscreen_button toggle for map modes', () => {
      const editor = makeEditor({ default_mode: 'map' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'hide_fullscreen_button')).toBe(true);
    });

    it('shows no_padding when in a locked mode (map_only)', () => {
      const editor = makeEditor({ default_mode: 'map_only' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'no_padding')).toBe(true);
    });

    it('shows no_padding when in a toggleable mode (map)', () => {
      const editor = makeEditor({ default_mode: 'map' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'no_padding')).toBe(true);
    });

    it('shows forecast_product selector when not in map_only mode', () => {
      const editor = makeEditor({ default_mode: 'map' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'forecast_product')).toBe(true);
    });

    it('hides forecast_product selector when in map_only mode', () => {
      const editor = makeEditor({ default_mode: 'map_only' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'forecast_product')).toBe(false);
    });

    it('offers the allow_geolocation toggle for map modes', () => {
      for (const default_mode of ['map', 'forecast', 'map_only'] as const) {
        const editor = makeEditor({ default_mode });
        const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
        const flatSchema = flattenSchema(schema);
        expect(flatSchema.some((s) => s.name === 'allow_geolocation')).toBe(true);
      }
    });

    it('hides the allow_geolocation toggle in forecast_only mode', () => {
      const editor = makeEditor({ default_mode: 'forecast_only' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);
      expect(flatSchema.some((s) => s.name === 'allow_geolocation')).toBe(false);
    });
  });

  describe('Duplicate resource registration', () => {
    it('should not throw when the editor module is evaluated a second time', async () => {
      vi.resetModules();
      await expect(import('../src/editor.js')).resolves.toBeDefined();
    });

    it('should keep the originally registered editor element after a second evaluation', async () => {
      const first = window.customElements.get('windy-card-editor');
      vi.resetModules();
      await import('../src/editor.js');

      expect(window.customElements.get('windy-card-editor')).toBe(first);
    });
  });
});

function flattenSchema(schema: HaFormSchema[]): HaFormSchema[] {
  let result: HaFormSchema[] = [];
  for (const item of schema) {
    result.push(item);
    if (item.schema) {
      result = result.concat(flattenSchema(item.schema));
    }
  }
  return result;
}
