/**
 * Everything both the card and the editor need to know about Windy's overlays.
 *
 * The two used to keep their own copies of these lists, and they drifted: the editor
 * still tested for the legacy ids (`cat`, `cap`) while it writes the canonical ones
 * (`turbulence`, `cape`), so the altitude selector disappeared for exactly the layers
 * that support it. One table, read by both, is the only way that stays fixed.
 */

/**
 * Aliases Windy has retired plus the lowercase spellings HA hands us (entity states are
 * lowercase by convention, and a config written by hand may be too), mapped onto the ids
 * the embed expects today. Keys are lowercase, values keep Windy's own casing.
 */
const OVERLAY_ALIASES: Record<string, string> = {
  // Legacy mappings (lowercase keys)
  raincum: 'rainAccu',
  gusts: 'gust',
  windcum: 'gustAccu',
  cat: 'turbulence',
  snow: 'snowAccu',
  snowdepth: 'snowcover',
  freezing: 'deg0',
  wetbulb: 'wetbulbtemp',
  uv: 'uvindex',
  cloudbase: 'cbase',
  cap: 'cape',
  thermals: 'ccl',
  swell: 'swell1',
  wwave: 'wwaves',
  tidalcurrents: 'currentsTide',
  pm25: 'pm2p5',
  aerosol: 'aod550',
  ozone: 'gtco3',
  so2: 'tcso2',
  surfaceozone: 'go3',
  co: 'cosc',
  dust: 'dustsm',
  extreme: 'efiWind',
  warnings: 'capAlerts',
  drought: 'drought40',
  fire: 'fwi',

  // Modern case corrections (lowercase keys mapped to camelCase / correct case)
  rainaccu: 'rainAccu',
  gustaccu: 'gustAccu',
  snowaccu: 'snowAccu',
  currentstide: 'currentsTide',
  efitemp: 'efiTemp',
  efiwind: 'efiWind',
  efirain: 'efiRain',
  capalerts: 'capAlerts',
  soilmoisture40: 'soilMoisture40',
  soilmoisture100: 'soilMoisture100',
  moistureanom40: 'moistureAnom40',
  moistureanom100: 'moistureAnom100',
};

/** The two overlays that are imagery rather than a model, so they carry no product or level. */
const RADAR_OR_SATELLITE = ['radar', 'satellite'];

/** Overlays Windy renders per altitude level. Everything else is surface-only. */
const SUPPORTS_ELEVATION = ['wind', 'temp', 'clouds', 'rh', 'dewpoint', 'turbulence', 'icing', 'cape'];

/** Overlays that come from one fixed source, so `product` is neither read nor offered. */
const HAS_FIXED_PRODUCT = [
  'fwi',
  'dfm10h',
  'waves',
  'swell1',
  'swell2',
  'swell3',
  'wwaves',
  'sst',
  'currents',
  'currentsTide',
  'airQ',
  'no2',
  'pm2p5',
  'aod550',
  'gtco3',
  'tcso2',
  'go3',
  'cosc',
  'dustsm',
  'efiTemp',
  'efiWind',
  'efiRain',
  'capAlerts',
  'drought40',
  'drought100',
  'soilMoisture40',
  'soilMoisture100',
  'moistureAnom40',
  'moistureAnom100',
];

/** Accumulation layers exist for ECMWF and GFS only. */
const ACCUMULATION = ['rainAccu', 'snowAccu', 'gustAccu'];

/** Turns whatever the config or an entity state says into the id the embed expects. */
export function normalizeOverlay(raw: string | undefined): string {
  const lower = (raw ?? 'wind').toLowerCase();
  return OVERLAY_ALIASES[lower] ?? lower;
}

export function isImageryOverlay(overlay: string): boolean {
  return RADAR_OR_SATELLITE.includes(normalizeOverlay(overlay));
}

export function supportsElevation(overlay: string): boolean {
  return SUPPORTS_ELEVATION.includes(normalizeOverlay(overlay));
}

export function hasFixedProduct(overlay: string): boolean {
  return HAS_FIXED_PRODUCT.includes(normalizeOverlay(overlay));
}

export function isAccumulationOverlay(overlay: string): boolean {
  return ACCUMULATION.includes(normalizeOverlay(overlay));
}

/** Whether a `product` selector makes sense at all for this overlay. */
export function supportsProduct(overlay: string): boolean {
  return !isImageryOverlay(overlay) && !hasFixedProduct(overlay);
}
