import { describe, it, expect } from 'vitest';
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

    it('hides map options when in forecast_only mode', () => {
      const editor = makeEditor({ default_mode: 'forecast_only' });
      const schema = (editor as unknown as { _getSchema: () => HaFormSchema[] })._getSchema();
      const flatSchema = flattenSchema(schema);

      expect(flatSchema.some((s) => s.name === 'zoom')).toBe(false);
      expect(flatSchema.some((s) => s.name === 'overlay')).toBe(false);
      expect(flatSchema.some((s) => s.name === 'show_marker')).toBe(false);
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
