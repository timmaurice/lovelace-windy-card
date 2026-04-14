import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, WindyCardConfig, HaFormSchema } from './types.js';
import { fireEvent } from './utils.js';
import { localize } from './localize.js';
import editorStyles from './styles/editor.styles.scss';

@customElement('windy-card-editor')
export class WindyCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WindyCardConfig;

  public setConfig(config: WindyCardConfig): void {
    const newConfig = { ...config };
    if (newConfig.zone_entity && !newConfig.location) {
      newConfig.location = newConfig.zone_entity;
    }
    delete newConfig.zone_entity;
    this._config = newConfig;
  }

  private _getSchema() {
    const overlay = this._config.overlay || 'wind';
    const isRadarOrSatellite = ['radar', 'satellite'].includes(overlay);
    const supportsElevation = ['wind', 'temp', 'clouds', 'rh', 'dewpoint', 'cat', 'icing', 'cap'].includes(overlay);
    const isForecastOnly = this._config.default_mode === 'forecast_only';
    const isMapOnly = this._config.default_mode === 'map_only';

    const schema: HaFormSchema[] = [
      // ── Section: View ──────────────────────────────────────────────
      {
        name: '',
        type: 'expandable',
        expanded: true,
        title: localize(this.hass, 'component.windy-card.editor.sections.view'),
        schema: [
          {
            name: '',
            type: 'grid',
            column_min_width: '100px',
            schema: [
              {
                name: 'default_mode',
                selector: {
                  select: {
                    mode: 'dropdown',
                    options: [
                      {
                        value: 'map',
                        label: localize(this.hass, 'component.windy-card.editor.options.default_mode.map'),
                      },
                      {
                        value: 'forecast',
                        label: localize(this.hass, 'component.windy-card.editor.options.default_mode.forecast'),
                      },
                      {
                        value: 'map_only',
                        label: localize(this.hass, 'component.windy-card.editor.options.default_mode.map_only'),
                      },
                      {
                        value: 'forecast_only',
                        label: localize(this.hass, 'component.windy-card.editor.options.default_mode.forecast_only'),
                      },
                    ],
                  },
                },
              },
              ...(!isForecastOnly
                ? [{ name: 'zoom', selector: { number: { mode: 'box', min: 3, max: 11 } } } as HaFormSchema]
                : []),
            ],
          },
          // Aspect ratio + fixed height (not needed for forecast_only)
          ...(!isForecastOnly
            ? [
                {
                  name: '',
                  type: 'grid',
                  column_min_width: '100px',
                  schema: [
                    {
                      name: 'aspect_ratio',
                      selector: {
                        select: {
                          mode: 'dropdown',
                          options: [
                            {
                              value: '',
                              label: localize(this.hass, 'component.windy-card.editor.options.aspect_ratio.none'),
                            },
                            { value: '16:9', label: '16:9' },
                            { value: '4:3', label: '4:3' },
                            { value: '3:2', label: '3:2' },
                            { value: '1:1', label: '1:1' },
                            { value: '2:1', label: '2:1' },
                          ],
                        },
                      },
                    },
                    { name: 'height', selector: { number: { mode: 'box', unit_of_measurement: 'px' } } },
                  ],
                } as HaFormSchema,
              ]
            : []),
          { name: 'no_padding', selector: { boolean: {} } },
        ],
      },

      // ── Section: Location ──────────────────────────────────────────
      {
        name: '',
        type: 'expandable',
        title: localize(this.hass, 'component.windy-card.editor.sections.location'),
        schema: [
          {
            name: 'location',
            selector: { entity: { domain: ['zone', 'device_tracker'] } },
          },
          {
            name: '',
            type: 'grid',
            column_min_width: '100px',
            schema: [
              { name: 'latitude', selector: { number: { mode: 'box', step: 'any' } } },
              { name: 'longitude', selector: { number: { mode: 'box', step: 'any' } } },
            ],
          },
        ],
      },

      // ── Section: Map Layer ─────────────────────────────────────────
      ...(!isForecastOnly
        ? [
            {
              name: '',
              type: 'expandable',
              title: localize(this.hass, 'component.windy-card.editor.sections.layer'),
              schema: [
                {
                  name: 'overlay_entity',
                  selector: { entity: {} },
                },
                {
                  name: 'overlay',
                  selector: {
                    select: {
                      mode: 'dropdown',
                      options: [
                        // Core
                        {
                          value: 'radar',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.radar'),
                        },
                        {
                          value: 'satellite',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.satellite'),
                        },
                        {
                          value: 'wind',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.wind'),
                        },
                        {
                          value: 'rain',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.rain'),
                        },
                        {
                          value: 'temp',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.temp'),
                        },
                        {
                          value: 'clouds',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.clouds'),
                        },
                        {
                          value: 'waves',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.waves'),
                        },
                        {
                          value: 'raincum',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.raincum'),
                        },
                        {
                          value: 'gusts',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.gusts'),
                        },
                        {
                          value: 'windcum',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.windcum'),
                        },
                        { value: 'cat', label: localize(this.hass, 'component.windy-card.editor.options.overlay.cat') },
                        {
                          value: 'icing',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.icing'),
                        },
                        // Expanded
                        {
                          value: 'snow',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.snow'),
                        },
                        {
                          value: 'snowdepth',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.snowdepth'),
                        },
                        {
                          value: 'ptype',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.ptype'),
                        },
                        {
                          value: 'thunder',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.thunder'),
                        },
                        {
                          value: 'dewpoint',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.dewpoint'),
                        },
                        { value: 'rh', label: localize(this.hass, 'component.windy-card.editor.options.overlay.rh') },
                        {
                          value: 'freezing',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.freezing'),
                        },
                        {
                          value: 'wetbulb',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.wetbulb'),
                        },
                        {
                          value: 'solarpower',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.solarpower'),
                        },
                        { value: 'uv', label: localize(this.hass, 'component.windy-card.editor.options.overlay.uv') },
                        {
                          value: 'hclouds',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.hclouds'),
                        },
                        {
                          value: 'mclouds',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.mclouds'),
                        },
                        {
                          value: 'lclouds',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.lclouds'),
                        },
                        { value: 'fog', label: localize(this.hass, 'component.windy-card.editor.options.overlay.fog') },
                        {
                          value: 'cloudtop',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.cloudtop'),
                        },
                        {
                          value: 'cloudbase',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.cloudbase'),
                        },
                        {
                          value: 'visibility',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.visibility'),
                        },
                        { value: 'cap', label: localize(this.hass, 'component.windy-card.editor.options.overlay.cap') },
                        {
                          value: 'thermals',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.thermals'),
                        },
                        {
                          value: 'swell',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.swell'),
                        },
                        {
                          value: 'swell2',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.swell2'),
                        },
                        {
                          value: 'swell3',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.swell3'),
                        },
                        {
                          value: 'wwave',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.wwave'),
                        },
                        { value: 'sst', label: localize(this.hass, 'component.windy-card.editor.options.overlay.sst') },
                        {
                          value: 'currents',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.currents'),
                        },
                        {
                          value: 'tidalcurrents',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.tidalcurrents'),
                        },
                        { value: 'no2', label: localize(this.hass, 'component.windy-card.editor.options.overlay.no2') },
                        {
                          value: 'pm25',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.pm25'),
                        },
                        {
                          value: 'aerosol',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.aerosol'),
                        },
                        {
                          value: 'ozone',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.ozone'),
                        },
                        { value: 'so2', label: localize(this.hass, 'component.windy-card.editor.options.overlay.so2') },
                        {
                          value: 'surfaceozone',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.surfaceozone'),
                        },
                        { value: 'co', label: localize(this.hass, 'component.windy-card.editor.options.overlay.co') },
                        {
                          value: 'dust',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.dust'),
                        },
                        {
                          value: 'pressure',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.pressure'),
                        },
                        {
                          value: 'extreme',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.extreme'),
                        },
                        {
                          value: 'warnings',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.warnings'),
                        },
                        {
                          value: 'drought',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.drought'),
                        },
                        {
                          value: 'fire',
                          label: localize(this.hass, 'component.windy-card.editor.options.overlay.fire'),
                        },
                      ],
                    },
                  },
                },

                ...(supportsElevation
                  ? [
                      {
                        name: 'level',
                        selector: {
                          select: {
                            mode: 'dropdown',
                            options: [
                              {
                                value: 'surface',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.surface'),
                              },
                              {
                                value: '100m',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.100m'),
                              },
                              {
                                value: '950h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.950h'),
                              },
                              {
                                value: '925h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.925h'),
                              },
                              {
                                value: '900h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.900h'),
                              },
                              {
                                value: '850h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.850h'),
                              },
                              {
                                value: '800h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.800h'),
                              },
                              {
                                value: '700h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.700h'),
                              },
                              {
                                value: '600h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.600h'),
                              },
                              {
                                value: '500h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.500h'),
                              },
                              {
                                value: '400h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.400h'),
                              },
                              {
                                value: '300h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.300h'),
                              },
                              {
                                value: '200h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.200h'),
                              },
                              {
                                value: '150h',
                                label: localize(this.hass, 'component.windy-card.editor.options.levels.150h'),
                              },
                            ],
                          },
                        },
                      } as HaFormSchema,
                    ]
                  : []),
                ...(!isRadarOrSatellite
                  ? [
                      {
                        name: 'product',
                        selector: {
                          select: {
                            mode: 'dropdown',
                            options: [
                              { value: 'ecmwf', label: 'ECMWF' },
                              { value: 'gfs', label: 'GFS' },
                              { value: 'icon', label: 'ICON' },
                              { value: 'iconD2', label: 'ICON-D2' },
                              { value: 'arome', label: 'AROME' },
                              { value: 'aladin', label: 'ALADIN' },
                              { value: 'nems', label: 'NEMS' },
                              { value: 'nam', label: 'NAM' },
                              { value: 'hrrr', label: 'HRRR' },
                            ],
                          },
                        },
                      } as HaFormSchema,
                    ]
                  : []),
              ],
            } as HaFormSchema,
          ]
        : []),

      // ── Section: Forecast Data ───────────────────────────────────────
      ...(!isMapOnly
        ? [
            {
              name: '',
              type: 'expandable',
              title: localize(this.hass, 'component.windy-card.editor.sections.forecast'),
              schema: [
                {
                  name: 'forecast_product',
                  selector: {
                    select: {
                      mode: 'dropdown',
                      options: [
                        { value: 'ecmwf', label: 'ECMWF' },
                        { value: 'gfs', label: 'GFS' },
                        { value: 'icon', label: 'ICON' },
                        { value: 'iconD2', label: 'ICON-D2' },
                        { value: 'arome', label: 'AROME' },
                        { value: 'aladin', label: 'ALADIN' },
                        { value: 'nems', label: 'NEMS' },
                        { value: 'nam', label: 'NAM' },
                        { value: 'hrrr', label: 'HRRR' },
                      ],
                    },
                  },
                } as HaFormSchema,
              ],
            } as HaFormSchema,
          ]
        : []),

      // ── Section: Units ─────────────────────────────────────────────
      {
        name: '',
        type: 'expandable',
        title: localize(this.hass, 'component.windy-card.editor.sections.units'),
        schema: [
          {
            name: '',
            type: 'grid',
            column_min_width: '100px',
            schema: [
              {
                name: 'metric_temp',
                selector: {
                  select: {
                    mode: 'dropdown',
                    options: [
                      {
                        value: 'default',
                        label: localize(this.hass, 'component.windy-card.editor.options.metrics.default'),
                      },
                      { value: '°C', label: '°C' },
                      { value: '°F', label: '°F' },
                    ],
                  },
                },
              },
              {
                name: 'metric_rain',
                selector: {
                  select: {
                    mode: 'dropdown',
                    options: [
                      {
                        value: 'default',
                        label: localize(this.hass, 'component.windy-card.editor.options.metrics.default'),
                      },
                      { value: 'mm', label: 'mm' },
                      { value: 'in', label: 'in' },
                    ],
                  },
                },
              },
            ],
          },
          {
            name: 'metric_wind',
            selector: {
              select: {
                mode: 'dropdown',
                options: [
                  {
                    value: 'default',
                    label: localize(this.hass, 'component.windy-card.editor.options.metrics.default'),
                  },
                  { value: 'kt', label: 'kt' },
                  { value: 'm/s', label: 'm/s' },
                  { value: 'km/h', label: 'km/h' },
                  { value: 'mph', label: 'mph' },
                  { value: 'bft', label: 'bft' },
                ],
              },
            },
          },
        ],
      },

      // ── Section: Display Options ───────────────────────────────────
      ...(!isForecastOnly
        ? [
            {
              name: '',
              type: 'expandable',
              title: localize(this.hass, 'component.windy-card.editor.sections.display'),
              schema: [
                { name: 'show_marker', selector: { boolean: {} } },
                { name: 'show_spot', selector: { boolean: {} } },
                ...(!isRadarOrSatellite ? [{ name: 'show_pressure', selector: { boolean: {} } } as HaFormSchema] : []),
                { name: 'hide_message', selector: { boolean: {} } },
              ],
            } as HaFormSchema,
          ]
        : []),
    ];

    return schema;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _computeLabel = (schema: HaFormSchema): string => {
    return localize(this.hass, `component.windy-card.editor.labels.${schema.name}`) || schema.name;
  };

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this as unknown as HTMLElement, 'config-changed', { config: ev.detail.value });
  }

  static styles = unsafeCSS(editorStyles);
}
