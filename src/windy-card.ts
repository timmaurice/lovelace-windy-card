import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardEditor, WindyCardConfig } from './types.js';
import { localize } from './localize.js';
import cardStyles from './styles/card.styles.scss';

const ELEMENT_NAME = 'windy-card';
const EDITOR_ELEMENT_NAME = `${ELEMENT_NAME}-editor`;

type ViewMode = 'map' | 'forecast';

@customElement(ELEMENT_NAME)
export class WindyCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WindyCardConfig;
  @state() private _mode: ViewMode = 'map';

  public setConfig(config: WindyCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    const newConfig = { ...config };
    if (newConfig.zone_entity && !newConfig.location) {
      newConfig.location = newConfig.zone_entity;
    }
    delete newConfig.zone_entity;

    this._config = newConfig;
    if (config.default_mode === 'forecast' || config.default_mode === 'forecast_only') {
      this._mode = 'forecast';
    } else {
      this._mode = 'map';
    }
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor.js');
    return document.createElement(EDITOR_ELEMENT_NAME) as unknown as LovelaceCardEditor;
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      default_mode: 'map',
      metric_temp: 'default',
      metric_rain: 'default',
      metric_wind: 'default',
      zoom: 5,
      overlay: 'wind',
      product: 'ecmwf',
      level: 'surface',
      aspect_ratio: '16:9',
    };
  }

  public getCardSize(): number {
    return 10;
  }

  private get _isMapOnly(): boolean {
    return this._config.default_mode === 'map_only';
  }

  private get _isForecastOnly(): boolean {
    return this._config.default_mode === 'forecast_only';
  }

  private _handleTabKeyDown(ev: KeyboardEvent): void {
    const tabs = ['map', 'forecast'] as ViewMode[];
    const currentIndex = tabs.indexOf(this._mode);

    if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      this._mode = tabs[nextIndex];
      this._focusTab(this._mode);
    } else if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      const nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      this._mode = tabs[nextIndex];
      this._focusTab(this._mode);
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      this._mode = tabs[0];
      this._focusTab(this._mode);
    } else if (ev.key === 'End') {
      ev.preventDefault();
      this._mode = tabs[tabs.length - 1];
      this._focusTab(this._mode);
    }
  }

  private _focusTab(mode: ViewMode): void {
    this.updateComplete.then(() => {
      const tab = this.shadowRoot?.querySelector(`.mode-tab[data-mode="${mode}"]`) as HTMLElement;
      tab?.focus();
    });
  }

  /** Resolve overlay from entity state or explicit config value */
  private _getOverlay(): string {
    let rawOverlay = this._config.overlay ?? 'wind';
    if (this._config.overlay_entity && this.hass?.states) {
      const entityState = this.hass.states[this._config.overlay_entity];
      if (entityState?.state) {
        rawOverlay = entityState.state;
      }
    }

    const legacyMap: Record<string, string> = {
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
    };

    return legacyMap[rawOverlay] || rawOverlay;
  }

  /** Resolve map center lat/lon from zone entity or explicit config values */
  private _getLocation(): { lat: number; lon: number } {
    const defaultLat = this.hass?.config?.latitude ?? 51.9503;
    const defaultLon = this.hass?.config?.longitude ?? 7.9855;

    if (this._config.location && this.hass?.states) {
      const zoneState = this.hass.states[this._config.location];
      if (zoneState) {
        const lat = zoneState.attributes['latitude'] as number | undefined;
        const lon = zoneState.attributes['longitude'] as number | undefined;
        if (lat !== undefined && lon !== undefined) {
          return { lat, lon };
        }
      }
    }

    return {
      lat: this._config.latitude ?? defaultLat,
      lon: this._config.longitude ?? defaultLon,
    };
  }

  /** Convert aspect_ratio string like "16:9" to a CSS padding-bottom percentage */
  private _getRatioPadding(): string | null {
    if (this._isForecastOnly) return null;
    const ratio = this._config.aspect_ratio;
    if (!ratio) return null;
    const parts = ratio.split(':');
    if (parts.length !== 2) return null;
    const w = parseFloat(parts[0]);
    const h = parseFloat(parts[1]);
    if (!w || !h) return null;
    return `${((h / w) * 100).toFixed(4)}%`;
  }

  protected render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const noPadding = this._config.no_padding;

    // map_only: render only the map, no toggle
    if (this._isMapOnly) {
      return html`
        <ha-card .header=${this._config.title} class=${noPadding ? 'no-padding' : ''}>
          <div class="card-content">
            <div class="content">${this._renderMap()}</div>
          </div>
        </ha-card>
      `;
    }

    // forecast_only: render only the forecast widget, no toggle
    if (this._isForecastOnly) {
      return html`
        <ha-card .header=${this._config.title} class=${noPadding ? 'no-padding' : ''}>
          <div class="card-content">
            <div class="content">${this._renderForecast()}</div>
          </div>
        </ha-card>
      `;
    }

    // map + forecast with toggle
    return html`
      <ha-card .header=${this._config.title} class=${noPadding ? 'no-padding' : ''}>
        <div class="card-content">
          <div class="modes" role="tablist" aria-orientation="horizontal" @keydown=${this._handleTabKeyDown}>
            <button
              role="tab"
              aria-selected=${this._mode === 'map'}
              aria-controls="map-panel"
              id="map-tab"
              tabindex="0"
              data-mode="map"
              class="mode-tab ${this._mode === 'map' ? 'active' : ''}"
              @click=${() => (this._mode = 'map')}
            >
              ${localize(this.hass, 'component.windy-card.card.map')}
            </button>
            <button
              role="tab"
              aria-selected=${this._mode === 'forecast'}
              aria-controls="forecast-panel"
              id="forecast-tab"
              tabindex="0"
              data-mode="forecast"
              class="mode-tab ${this._mode === 'forecast' ? 'active' : ''}"
              @click=${() => (this._mode = 'forecast')}
            >
              ${localize(this.hass, 'component.windy-card.card.forecast')}
            </button>
          </div>
          <div class="content" role="tabpanel" id="${this._mode}-panel" aria-labelledby="${this._mode}-tab">
            ${this._mode === 'map' ? this._renderMap() : this._renderForecast()}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _resetMap(e: Event) {
    if (e.currentTarget) {
      const container = (e.currentTarget as HTMLElement).closest('.iframe-container');
      const iframe = container?.querySelector('iframe');
      if (iframe) {
        // Force reload original iframe source
        const currentSrc = iframe.getAttribute('src');
        if (currentSrc) {
          iframe.src = 'about:blank';
          setTimeout(() => {
            iframe.src = currentSrc;
          }, 10);
        }
      }
    }
  }

  private _renderIframeWithWrapper(
    url: string,
    defaultHeight: number,
    title: string,
    showResetButton: boolean = false,
  ) {
    const ratioPadding = this._getRatioPadding();
    const height = this._config.height;

    const resetButton = showResetButton
      ? html`<button
          class="reset-button"
          @click=${this._resetMap}
          title="${localize(this.hass, 'component.windy-card.card.reset_map') ?? 'Reset Map'}"
        >
          <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
        </button>`
      : '';

    if (ratioPadding && !height) {
      return html`
        <div
          class="iframe-container ratio-wrapper"
          style="padding-bottom: ${ratioPadding}; position: relative; width: 100%; height: 0;"
        >
          <iframe
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
            src="${url}"
            title="${title}"
          ></iframe>
          ${resetButton}
        </div>
      `;
    }

    return html`
      <div class="iframe-container" style="position: relative; width: 100%;">
        <iframe
          width="100%"
          height="${height ?? defaultHeight}"
          src="${url}"
          title="${title}"
          style="border: none; display: block;"
        ></iframe>
        ${resetButton}
      </div>
    `;
  }

  private _renderMap() {
    const { lat, lon } = this._getLocation();

    // Zoom limits 3-11
    let zoom = this._config.zoom ?? 5;
    if (zoom < 3) zoom = 3;
    if (zoom > 11) zoom = 11;

    const overlay = this._getOverlay();
    const isRadarOrSatellite = ['radar', 'satellite'].includes(overlay);
    const supportsElevation = ['wind', 'temp', 'clouds', 'rh', 'dewpoint', 'turbulence', 'icing', 'cape'].includes(
      overlay,
    );

    const hasFixedProduct = [
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
    ].includes(overlay);

    const product = isRadarOrSatellite || hasFixedProduct ? '' : (this._config.product ?? 'ecmwf');
    const level = supportsElevation ? (this._config.level ?? 'surface') : 'surface';

    const metricTemp = this._config.metric_temp ?? 'default';
    const metricRain = this._config.metric_rain ?? 'default';
    const metricWind = this._config.metric_wind ?? 'default';

    const marker = this._config.show_marker ? `&detailLat=${lat}&detailLon=${lon}&marker=true` : '';
    const detail = this._config.show_spot ? `&detailLat=${lat}&detailLon=${lon}&detail=true` : '';

    // Pressure incompatible with radar/satellite
    const pressure = this._config.show_pressure && !isRadarOrSatellite ? '&pressure=true' : '';
    const message = this._config.hide_message ? '&message=true' : '';

    const url = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=${metricRain}&metricTemp=${metricTemp}&metricWind=${metricWind}&zoom=${zoom}&overlay=${overlay}&product=${product}&level=${level}&lat=${lat}&lon=${lon}${marker}${detail}${pressure}${message}`;

    return this._renderIframeWithWrapper(url, 450, 'Windy Map', true);
  }

  private _renderForecast() {
    const { lat, lon } = this._getLocation();
    const metricTemp = this._config.metric_temp ?? 'default';
    const metricRain = this._config.metric_rain ?? 'default';
    const metricWind = this._config.metric_wind ?? 'default';
    const product = this._config.forecast_product ?? this._config.product ?? 'ecmwf';

    const url = `https://embed.windy.com/embed.html?type=forecast&location=coordinates&detail=true&detailLat=${lat}&detailLon=${lon}&metricTemp=${metricTemp}&metricRain=${metricRain}&metricWind=${metricWind}&product=${product}`;

    return this._renderIframeWithWrapper(url, 185, 'Windy Forecast', false);
  }

  static styles = unsafeCSS(cardStyles);
}

declare global {
  interface HTMLElementTagNameMap {
    'windy-card': WindyCard;
  }
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      documentationURL?: string;
      preview?: boolean;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: ELEMENT_NAME,
  name: 'Windy Card',
  description: localize(undefined, 'component.windy-card.common.description'),
  preview: true,
});
