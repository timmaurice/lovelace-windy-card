import { describe, it, expect } from 'vitest';
import { resolveEntity } from '../src/entity.js';
import type { HomeAssistant } from '../src/types.js';

function makeHass(states: Record<string, { state: string; attributes?: Record<string, unknown> }>): HomeAssistant {
  const full = Object.fromEntries(
    Object.entries(states).map(([entity_id, entity]) => [
      entity_id,
      { entity_id, state: entity.state, attributes: entity.attributes ?? {} },
    ]),
  );
  return { states: full } as unknown as HomeAssistant;
}

describe('resolveEntity()', () => {
  it('resolves an entity that has a usable state', () => {
    const hass = makeHass({ 'sensor.layer': { state: 'clouds', attributes: { friendly_name: 'Layer' } } });
    const resolved = resolveEntity(hass, 'sensor.layer');

    expect(resolved.ok).toBe(true);
    if (!resolved.ok) throw new Error('expected a resolved entity');
    expect(resolved.state).toBe('clouds');
    expect(resolved.entity.attributes.friendly_name).toBe('Layer');
  });

  it('reports a missing entity as not_found', () => {
    expect(resolveEntity(makeHass({}), 'sensor.gone')).toEqual({
      ok: false,
      entityId: 'sensor.gone',
      reason: 'not_found',
    });
  });

  it('reports no hass at all as not_found rather than throwing', () => {
    expect(resolveEntity(undefined, 'sensor.layer')).toEqual({
      ok: false,
      entityId: 'sensor.layer',
      reason: 'not_found',
    });
  });

  // These two are states, not values: passing them on as if they were a value is the
  // whole class of bug this helper exists to stop.
  it.each([
    ['unavailable', 'unavailable'],
    ['unknown', 'unknown'],
    ['UNAVAILABLE', 'unavailable'],
    ['', 'unknown'],
  ])('reports the state %s as %s', (state, reason) => {
    const resolved = resolveEntity(makeHass({ 'sensor.layer': { state } }), 'sensor.layer');
    expect(resolved).toEqual({ ok: false, entityId: 'sensor.layer', reason });
  });

  it('reports an entity outside the allowed domains as wrong_domain', () => {
    const hass = makeHass({ 'light.kitchen': { state: 'on' } });
    expect(resolveEntity(hass, 'light.kitchen', ['zone', 'device_tracker'])).toEqual({
      ok: false,
      entityId: 'light.kitchen',
      reason: 'wrong_domain',
    });
  });

  it('accepts an entity inside the allowed domains', () => {
    const hass = makeHass({ 'zone.home': { state: 'zoning' } });
    expect(resolveEntity(hass, 'zone.home', ['zone', 'device_tracker']).ok).toBe(true);
  });
});
