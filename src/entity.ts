import { HassEntity, HomeAssistant } from './types.js';

/**
 * One place that answers "can I use this entity?".
 *
 * Every option that names an entity used to read `hass.states[id]?.state` and use whatever
 * came back. That silently passes `unavailable` and `unknown` on as if they were values -
 * in this card's case straight into the Windy URL as a layer name - so a restarting
 * integration looked like a broken card. Resolving through one helper gives the caller a
 * reason it can name to the user instead of a bad value it cannot.
 */

/** Why an entity cannot be used. Distinct reasons, because the user needs different things. */
export type EntityProblem = 'not_found' | 'unavailable' | 'unknown' | 'wrong_domain';

export type ResolvedEntity =
  { ok: true; entity: HassEntity; state: string } | { ok: false; entityId: string; reason: EntityProblem };

/** The two states Home Assistant uses to say "no value", never a value of their own. */
const UNUSABLE_STATES: Record<string, EntityProblem> = {
  unavailable: 'unavailable',
  unknown: 'unknown',
};

/**
 * @param domains Optional allow-list of entity domains. Left out, any domain passes -
 *   several options here care about an attribute or a value rather than a domain.
 */
export function resolveEntity(hass: HomeAssistant | undefined, entityId: string, domains?: string[]): ResolvedEntity {
  const entity = hass?.states?.[entityId];
  if (!entity) {
    return { ok: false, entityId, reason: 'not_found' };
  }
  if (domains && !domains.includes(entityId.split('.')[0])) {
    return { ok: false, entityId, reason: 'wrong_domain' };
  }
  const state = entity.state ?? '';
  const unusable = UNUSABLE_STATES[state.toLowerCase()];
  if (unusable || state === '') {
    // An empty state is the same situation as `unknown` for every caller: nothing to use.
    return { ok: false, entityId, reason: unusable ?? 'unknown' };
  }
  return { ok: true, entity, state };
}
