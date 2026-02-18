export interface FrontendLocaleData {
  language: string;
  number_format: 'comma_decimal' | 'decimal_comma' | 'space_comma' | 'system';
  time_format: '12' | '24' | 'system' | 'am_pm';
  // You can expand this with more properties if needed
}

// A basic representation of the Home Assistant object
export interface HomeAssistant {
  states: { [entity_id: string]: HassEntity };
  entities: { [entity_id: string]: HassEntityRegistryDisplayEntry };
  localize: (key: string, ...args: unknown[]) => string;
  language: string;
  locale: FrontendLocaleData;
  callWS: <T>(message: { type: string; [key: string]: unknown }) => Promise<T>;
  themes?: {
    darkMode?: boolean;
    [key: string]: unknown;
  };
  config: {
    latitude: number;
    longitude: number;
    elevation: number;
    unit_system: {
      length: string;
      [key: string]: unknown;
    };
    time_zone: string;
    [key: string]: unknown;
  };
  // You can expand this with more properties from the hass object if needed
}

// A basic representation of a Home Assistant entity state object
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    [key: string]: unknown;
  };
}

export interface HassEntityRegistryDisplayEntry {
  entity_id: string;
  display_precision?: number;
}

// A basic representation of a Lovelace card
export interface LovelaceCard {
  hass?: HomeAssistant;
  editMode?: boolean;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number | Promise<number>;
}

// A basic representation of a Lovelace card configuration
export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface LovelaceCardEditor {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

export interface WindyCardConfig extends LovelaceCardConfig {
  title?: string;
  default_mode?: 'map' | 'forecast' | 'map_only' | 'forecast_only';
  latitude?: number;
  longitude?: number;
  zone_entity?: string;
  zoom?: number;
  overlay?: string;
  level?: string;
  product?: string;
  metric_temp?: 'default' | '°C' | '°F';
  metric_rain?: 'default' | 'mm' | 'in';
  metric_wind?: 'default' | 'kt' | 'm/s' | 'km/h' | 'mph' | 'bft';
  aspect_ratio?: string;
  height?: number;
  show_marker?: boolean;
  show_spot?: boolean;
  show_pressure?: boolean;
  hide_message?: boolean;
  no_padding?: boolean;
}

export interface HaFormSchema {
  name: string;
  type?: string;
  title?: string;
  expanded?: boolean;
  selector?: unknown;
  schema?: HaFormSchema[];
  column_min_width?: string;
}
