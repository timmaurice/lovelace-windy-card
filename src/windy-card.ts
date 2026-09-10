import { LitElement, html, nothing, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardEditor, WindyCardConfig } from './types.js';
import { localize } from './localize.js';
import cardStyles from './styles/card.styles.scss';
import { ELEMENT_NAME, EDITOR_ELEMENT_NAME } from './constants.js';
import { resolveEntity } from './entity.js';
import {
  hasFixedProduct,
  isKnownOverlay,
  isAccumulationOverlay,
  isImageryOverlay,
  normalizeOverlay,
  supportsElevation,
} from './overlays.js';

type ViewMode = 'map' | 'forecast';

const EMBED_URL = 'https://embed.windy.com/embed.html';

export class WindyCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WindyCardConfig;
  @state() private _mode: ViewMode = 'map';
  @state() private _isStatic: boolean = false;
  @state() private _isFullscreen: boolean = false;
  @state() private _mapUrl: string = '';
  @state() private _forecastUrl: string = '';

  @state() private _loopIndex: number = 0;

  private _lastUpdateTime: number = 0;
  private _throttleTimer?: ReturnType<typeof setTimeout>;
  private _pendingMapUrl: string = '';
  private _pendingForecastUrl: string = '';
  private _bypassThrottle: boolean = false;
  private _loopTimer?: ReturnType<typeof setInterval>;
  private _lastLoopParams?: { overlays: string[]; delay: number };
  private _insecureContextWarned: boolean = false;

  public setConfig(config: WindyCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    const newConfig = { ...config };
    if (newConfig.zone_entity && !newConfig.location) {
      newConfig.location = newConfig.zone_entity;
    }
    delete newConfig.zone_entity;

    if (newConfig.overlay_loop) {
      if (typeof newConfig.overlay_loop === 'string') {
        newConfig.overlay_loop = (newConfig.overlay_loop as string)
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      } else if (!Array.isArray(newConfig.overlay_loop)) {
        newConfig.overlay_loop = [];
      }
    }

    if (newConfig.overlay_loop_delay !== undefined) {
      const delay = Number(newConfig.overlay_loop_delay);
      newConfig.overlay_loop_delay = !isNaN(delay) && delay > 0 ? delay : 30;
    }

    this._config = newConfig;
    if (config.default_mode === 'forecast' || config.default_mode === 'forecast_only') {
      this._mode = 'forecast';
    } else {
      this._mode = 'map';
    }

    this._isStatic = !!newConfig.static_map;
    this._bypassThrottle = true;
    this._updateUrls(true);
    this._warnIfInsecureContext();
  }

  /**
   * Outside a secure context the browser drops the delegated geolocation permission
   * without a prompt, an error, or any visible change, so the option looks broken
   * rather than unavailable. Say so once per card instead of failing silently.
   */
  private _warnIfInsecureContext(): void {
    if (this._insecureContextWarned || !this._config?.allow_geolocation || window.isSecureContext) {
      return;
    }
    this._insecureContextWarned = true;
    console.warn(
      `${ELEMENT_NAME}: "allow_geolocation" has no effect on ${window.location.origin} because it is not a secure context. ` +
        'Browsers only grant geolocation over HTTPS (or localhost), so Windy keeps locating the viewer by IP address.',
    );
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._warnIfInsecureContext();
    this._setupLoopTimer();
    document.addEventListener('fullscreenchange', this._handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this._handleFullscreenChange);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._throttleTimer) {
      clearTimeout(this._throttleTimer);
      this._throttleTimer = undefined;
    }
    if (this._loopTimer) {
      clearInterval(this._loopTimer);
      this._loopTimer = undefined;
    }
    document.removeEventListener('fullscreenchange', this._handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this._handleFullscreenChange);
    window.removeEventListener('keydown', this._handleFullscreenKeyDown);
    if (this._isFullscreen) {
      this._isFullscreen = false;
      this._exitNativeFullscreen();
    }
  }

  protected willUpdate(changedProperties: Map<string | number | symbol, unknown>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('_config')) {
      const newLoop = this._config?.overlay_loop || [];
      const newDelay = this._config?.overlay_loop_delay ?? 30;

      const oldParams = this._lastLoopParams;
      const isLoopEqual =
        oldParams &&
        oldParams.overlays.length === newLoop.length &&
        oldParams.overlays.every((val, i) => val === newLoop[i]) &&
        oldParams.delay === newDelay;

      if (!isLoopEqual) {
        this._lastLoopParams = { overlays: [...newLoop], delay: newDelay };
        this._loopIndex = 0;
        this._setupLoopTimer();
      }
    }

    if (
      changedProperties.has('hass') ||
      changedProperties.has('_config') ||
      changedProperties.has('_loopIndex') ||
      this._bypassThrottle
    ) {
      const force = this._bypassThrottle || changedProperties.has('_loopIndex');
      this._updateUrls(force);
      this._bypassThrottle = false;
    }
  }

  private _setupLoopTimer(): void {
    if (this._loopTimer) {
      clearInterval(this._loopTimer);
      this._loopTimer = undefined;
    }

    const loop = this._config?.overlay_loop;
    if (Array.isArray(loop) && loop.length > 1) {
      const delay = (this._config?.overlay_loop_delay ?? 30) * 1000;
      this._loopTimer = setInterval(() => {
        this._loopIndex = (this._loopIndex + 1) % loop.length;
      }, delay);
    }
  }

  private _updateUrls(force: boolean = false): void {
    const targetMapUrl = this._computeMapUrl();
    const targetForecastUrl = this._computeForecastUrl();

    if (targetMapUrl !== this._mapUrl || targetForecastUrl !== this._forecastUrl) {
      const updateInterval = this._config?.update_interval ?? 0;
      if (updateInterval <= 0 || force || !this._mapUrl) {
        this._mapUrl = targetMapUrl;
        this._forecastUrl = targetForecastUrl;
        this._lastUpdateTime = Date.now();
        if (this._throttleTimer) {
          clearTimeout(this._throttleTimer);
          this._throttleTimer = undefined;
        }
      } else {
        const now = Date.now();
        const timeSinceLastUpdate = now - this._lastUpdateTime;
        this._pendingMapUrl = targetMapUrl;
        this._pendingForecastUrl = targetForecastUrl;

        if (timeSinceLastUpdate >= updateInterval * 1000) {
          this._mapUrl = targetMapUrl;
          this._forecastUrl = targetForecastUrl;
          this._lastUpdateTime = now;
          if (this._throttleTimer) {
            clearTimeout(this._throttleTimer);
            this._throttleTimer = undefined;
          }
        } else if (!this._throttleTimer) {
          const remaining = updateInterval * 1000 - timeSinceLastUpdate;
          this._throttleTimer = setTimeout(() => {
            this._mapUrl = this._pendingMapUrl;
            this._forecastUrl = this._pendingForecastUrl;
            this._lastUpdateTime = Date.now();
            this._throttleTimer = undefined;
          }, remaining);
        }
      }
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
    let rawOverlay: string;
    const loop = this._config.overlay_loop;
    if (Array.isArray(loop) && loop.length > 0) {
      const idx = this._loopIndex % loop.length;
      rawOverlay = (loop[idx] ?? 'wind').toLowerCase();
    } else {
      rawOverlay = (this._config.overlay ?? 'wind').toLowerCase();
      // Only a usable state that actually names a layer replaces the configured one -
      // anything else keeps the fallback and is reported by _entityProblems() instead.
      if (this._config.overlay_entity) {
        const resolved = resolveEntity(this.hass, this._config.overlay_entity);
        if (resolved.ok && isKnownOverlay(resolved.state)) {
          rawOverlay = resolved.state.toLowerCase();
        }
      }
    }

    return normalizeOverlay(rawOverlay);
  }

  /** Resolve map center lat/lon from zone entity or explicit config values */
  private _getLocation(): { lat: number; lon: number } {
    const defaultLat = this.hass?.config?.latitude ?? 51.9503;
    const defaultLon = this.hass?.config?.longitude ?? 7.9855;

    // Deliberately not resolved through resolveEntity(): the map needs coordinates, not a
    // state, and a device tracker that has gone unavailable still carries its last known
    // position. Refusing that would move the map instead of leaving it where it was.
    const locationEntity = this._config.location ? this.hass?.states?.[this._config.location] : undefined;
    if (locationEntity) {
      const lat = locationEntity.attributes['latitude'] as number | undefined;
      const lon = locationEntity.attributes['longitude'] as number | undefined;
      if (lat !== undefined && lon !== undefined) {
        return { lat, lon };
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

  /**
   * The entity options that cannot be used right now, with the reason.
   *
   * Recomputed on every render from `hass` and the config rather than remembered, so it
   * cannot go stale and needs no reactive state of its own.
   */
  private _entityProblems(): { entityId: string; reason: string; value?: string }[] {
    const problems: { entityId: string; reason: string; value?: string }[] = [];
    const loop = this._config.overlay_loop;
    const loopWins = Array.isArray(loop) && loop.length > 0;

    // The loop overrides the entity, so a broken entity is not worth a row while it runs.
    if (this._config.overlay_entity && !loopWins) {
      const resolved = resolveEntity(this.hass, this._config.overlay_entity);
      if (!resolved.ok) {
        problems.push({ entityId: resolved.entityId, reason: resolved.reason });
      } else if (!isKnownOverlay(resolved.state)) {
        problems.push({ entityId: this._config.overlay_entity, reason: 'unknown_value', value: resolved.state });
      }
    }

    if (this._config.location) {
      const entity = this.hass?.states?.[this._config.location];
      if (!entity) {
        problems.push({ entityId: this._config.location, reason: 'not_found' });
      } else if (entity.attributes['latitude'] === undefined || entity.attributes['longitude'] === undefined) {
        // Any domain may carry coordinates, so this is about the attributes, not the domain.
        problems.push({ entityId: this._config.location, reason: 'no_coordinates' });
      }
    }

    return problems;
  }

  private _renderEntityProblems() {
    const problems = this._entityProblems();
    if (!problems.length) return nothing;

    return html`
      <div class="entity-problems">
        ${problems.map(
          (problem) => html`
            <div class="entity-problem" role="alert">
              <ha-icon icon="mdi:alert-outline"></ha-icon>
              <span
                >${localize(this.hass, `component.windy-card.card.entity_problem.${problem.reason}`, {
                  entity: problem.entityId,
                  value: problem.value ?? '',
                })}</span
              >
            </div>
          `,
        )}
      </div>
    `;
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
            ${this._renderEntityProblems()}
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
            ${this._renderEntityProblems()}
            <div class="content">${this._renderForecast()}</div>
          </div>
        </ha-card>
      `;
    }

    // map + forecast with toggle
    return html`
      <ha-card .header=${this._config.title} class=${noPadding ? 'no-padding' : ''}>
        <div class="card-content">
          ${this._renderEntityProblems()}
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

  private _toggleStatic(e: Event) {
    e.preventDefault();
    this._isStatic = !this._isStatic;
  }

  private get _fullscreenEnabled(): boolean {
    return !this._config?.hide_fullscreen_button;
  }

  /** The element the browser currently shows natively fullscreen, if any. */
  private get _nativeFullscreenElement(): Element | null {
    const doc = document as Document & { webkitFullscreenElement?: Element | null };
    return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
  }

  /**
   * Native fullscreen is a bonus, not the mechanism: it also hides the browser chrome,
   * but it is unavailable in several webviews (notably iOS) and can be blocked by
   * permissions policy. The `.fullscreen` CSS overlay covers the viewport on its own,
   * so a rejected request is not an error.
   */
  private _requestNativeFullscreen(el: HTMLElement): void {
    const target = el as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
    const request = target.requestFullscreen ?? target.webkitRequestFullscreen;
    if (typeof request !== 'function') return;
    Promise.resolve(request.call(target)).catch(() => undefined);
  }

  private _exitNativeFullscreen(): void {
    if (!this._nativeFullscreenElement) return;
    const doc = document as Document & { webkitExitFullscreen?: () => Promise<void> | void };
    const exit = document.exitFullscreen ?? doc.webkitExitFullscreen;
    if (typeof exit !== 'function') return;
    Promise.resolve(exit.call(document)).catch(() => undefined);
  }

  /** Keep our state in sync when the browser leaves native fullscreen on its own (Esc, gesture). */
  private _handleFullscreenChange = (): void => {
    if (this._isFullscreen && !this._nativeFullscreenElement) {
      this._exitFullscreen();
    }
  };

  /** Escape is handled by the browser in native fullscreen, but not by the CSS overlay fallback. */
  private _handleFullscreenKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === 'Escape' && this._isFullscreen) {
      this._exitFullscreen();
    }
  };

  private _enterFullscreen(container: HTMLElement | null): void {
    this._isFullscreen = true;
    window.addEventListener('keydown', this._handleFullscreenKeyDown);
    if (container) {
      this._requestNativeFullscreen(container);
    }
  }

  private _exitFullscreen(): void {
    this._isFullscreen = false;
    window.removeEventListener('keydown', this._handleFullscreenKeyDown);
    this._exitNativeFullscreen();
  }

  private _toggleFullscreen(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (this._isFullscreen) {
      this._exitFullscreen();
      return;
    }
    const container = (e.currentTarget as HTMLElement)?.closest('.iframe-container') as HTMLElement | null;
    this._enterFullscreen(container);
  }

  /**
   * Double-click/tap to toggle fullscreen. This only reaches us while the interaction
   * lock is on — an interactive Windy iframe swallows the gesture itself.
   */
  private _handleContainerDblClick(e: Event) {
    if (!this._fullscreenEnabled) return;
    if ((e.target as HTMLElement)?.closest?.('.action-button')) return;
    if (this._isFullscreen) {
      this._exitFullscreen();
      return;
    }
    this._enterFullscreen(e.currentTarget as HTMLElement | null);
  }

  private _renderIframeWithWrapper(
    url: string,
    defaultHeight: number,
    title: string,
    showResetButton: boolean = false,
    respectStaticLock: boolean = true,
    allowFullscreen: boolean = false,
    useAspectRatio: boolean = true,
  ) {
    // `aspect_ratio` sizes the map. The spot forecast is a widget of its own with a fixed
    // layout, so stretching it to the map's ratio only padded it with empty space.
    const ratioPadding = useAspectRatio ? this._getRatioPadding() : null;
    const height = this._config.height;
    const isFullscreen = allowFullscreen && this._isFullscreen;

    // The static/lock toggle is meant to stop the map from hijacking page scroll/pan
    // gestures. It has no equivalent problem in the forecast panel, which should always
    // stay scrollable, so only the map iframe should ever get pointer-events disabled.
    const pointerEvents = respectStaticLock && this._isStatic ? 'pointer-events: none;' : '';

    // Lets Windy locate the viewer by GPS instead of by IP, which is what puts the radar
    // overlay's location dot in the right place.
    const allow = this._config.allow_geolocation ? 'geolocation' : nothing;

    // Every toolbar button is an icon and nothing else, so without a label a screen
    // reader announces "button" and no more. The label is the same string the tooltip
    // shows, and the two toggles also say which way they currently stand.
    const resetLabel = localize(this.hass, 'component.windy-card.card.reset_map') ?? 'Reset Map';
    const resetButton = showResetButton
      ? html`<button
          class="action-button reset-button"
          @click=${this._resetMap}
          title="${resetLabel}"
          aria-label="${resetLabel}"
        >
          <ha-icon icon="mdi:crosshairs-gps" aria-hidden="true"></ha-icon>
        </button>`
      : '';

    // Only meaningful where the lock actually disables interaction (the map) — showing it
    // on the forecast panel would suggest it does something there, which it no longer does.
    const staticLabel = this._isStatic
      ? (localize(this.hass, 'component.windy-card.card.enable_interaction') ?? 'Enable Interaction')
      : (localize(this.hass, 'component.windy-card.card.disable_interaction') ?? 'Disable Interaction');
    const toggleStaticButton = respectStaticLock
      ? html`<button
          class="action-button static-toggle-button ${this._isStatic ? 'is-active' : ''}"
          @click=${this._toggleStatic}
          title="${staticLabel}"
          aria-label="${staticLabel}"
          aria-pressed="${this._isStatic}"
        >
          <ha-icon icon="${this._isStatic ? 'mdi:lock' : 'mdi:lock-open-variant'}" aria-hidden="true"></ha-icon>
        </button>`
      : '';

    const fullscreenLabel = this._isFullscreen
      ? (localize(this.hass, 'component.windy-card.card.exit_fullscreen') ?? 'Exit full screen')
      : (localize(this.hass, 'component.windy-card.card.fullscreen') ?? 'Full screen');
    const fullscreenButton =
      allowFullscreen && this._fullscreenEnabled
        ? html`<button
            class="action-button fullscreen-button"
            @click=${this._toggleFullscreen}
            title="${fullscreenLabel}"
            aria-label="${fullscreenLabel}"
            aria-pressed="${this._isFullscreen}"
          >
            <ha-icon
              icon="${this._isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'}"
              aria-hidden="true"
            ></ha-icon>
          </button>`
        : '';

    const dblClickHandler = allowFullscreen ? this._handleContainerDblClick : undefined;

    // Fullscreen overrides the inline geometry rather than swapping templates, so Lit keeps
    // the same iframe element alive and the map does not reload when entering/leaving.
    const fullscreenGeometry = 'position: fixed; inset: 0; width: auto; height: auto; padding: 0;';

    if (ratioPadding && !height) {
      return html`
        <div
          class="iframe-container ratio-wrapper ${isFullscreen ? 'fullscreen' : ''}"
          style="${
            isFullscreen
              ? fullscreenGeometry
              : `padding-bottom: ${ratioPadding}; position: relative; width: 100%; height: 0;`
          }"
          @dblclick=${dblClickHandler}
        >
          <iframe
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; ${pointerEvents}"
            src="${url}"
            title="${title}"
            allow="${allow}"
          ></iframe>
          <div class="action-buttons">${resetButton} ${toggleStaticButton} ${fullscreenButton}</div>
        </div>
      `;
    }

    return html`
      <div
        class="iframe-container ${isFullscreen ? 'fullscreen' : ''}"
        style="${isFullscreen ? fullscreenGeometry : 'position: relative; width: 100%;'}"
        @dblclick=${dblClickHandler}
      >
        <iframe
          width="100%"
          height="${height ?? defaultHeight}"
          src="${url}"
          title="${title}"
          allow="${allow}"
          style="${
            isFullscreen
              ? `position: absolute; inset: 0; width: 100%; height: 100%; border: none; display: block; ${pointerEvents}`
              : `border: none; display: block; ${pointerEvents}`
          }"
        ></iframe>
        <div class="action-buttons">${resetButton} ${toggleStaticButton} ${fullscreenButton}</div>
      </div>
    `;
  }

  private _computeMapUrl(): string {
    const { lat, lon } = this._getLocation();

    // Zoom limits 3-11
    let zoom = this._config.zoom ?? 5;
    if (zoom < 3) zoom = 3;
    if (zoom > 11) zoom = 11;

    const overlay = this._getOverlay();
    const isRadarOrSatellite = isImageryOverlay(overlay);

    let product = isRadarOrSatellite || hasFixedProduct(overlay) ? '' : (this._config.product ?? 'ecmwf');

    // Accumulation layers (rainAccu, snowAccu, gustAccu) only support ECMWF and GFS.
    // Fall back to ECMWF if an unsupported product is configured.
    if (isAccumulationOverlay(overlay)) {
      if (product && !['ecmwf', 'gfs'].includes(product)) {
        product = 'ecmwf';
      }
    }

    const level = supportsElevation(overlay) ? (this._config.level ?? 'surface') : 'surface';

    const metricTemp = this._config.metric_temp ?? 'default';
    const metricRain = this._config.metric_rain ?? 'default';
    const metricWind = this._config.metric_wind ?? 'default';

    const params = new URLSearchParams();
    // Built through URLSearchParams rather than string concatenation: several of these
    // values are user input (units like "m/s", a layer name that arrives from an entity
    // state), and unencoded they either break the parameter or smuggle another one in.
    params.set('type', 'map');
    params.set('location', 'coordinates');
    params.set('metricRain', metricRain);
    params.set('metricTemp', metricTemp);
    params.set('metricWind', metricWind);
    params.set('zoom', String(zoom));
    params.set('overlay', overlay);
    if (product) params.set('product', product);
    params.set('level', level);
    params.set('lat', String(lat));
    params.set('lon', String(lon));

    // Both the marker and the spot popup are placed at the same detail coordinates.
    if (this._config.show_marker || this._config.show_spot) {
      params.set('detailLat', String(lat));
      params.set('detailLon', String(lon));
    }
    if (this._config.show_marker) params.set('marker', 'true');
    if (this._config.show_spot) params.set('detail', 'true');
    if (this._config.show_pressure && !isRadarOrSatellite) params.set('pressure', 'true');
    if (this._config.hide_message) params.set('message', 'true');
    if (this._config.autoplay) params.set('play', 'true');
    params.set('lang', this.hass?.language || 'en');

    return `${EMBED_URL}?${params.toString()}`;
  }

  private _renderMap() {
    // The frame title is what a screen reader announces for the embed, so it belongs in
    // the translations like every other user-facing string.
    const title = localize(this.hass, 'component.windy-card.card.map_frame') ?? 'Windy Map';
    return this._renderIframeWithWrapper(this._mapUrl, 450, title, true, true, true);
  }

  private _computeForecastUrl(): string {
    const { lat, lon } = this._getLocation();
    const params = new URLSearchParams();
    params.set('type', 'forecast');
    params.set('location', 'coordinates');
    params.set('detail', 'true');
    params.set('detailLat', String(lat));
    params.set('detailLon', String(lon));
    params.set('metricTemp', this._config.metric_temp ?? 'default');
    params.set('metricRain', this._config.metric_rain ?? 'default');
    params.set('metricWind', this._config.metric_wind ?? 'default');
    params.set('product', this._config.forecast_product ?? this._config.product ?? 'ecmwf');
    params.set('lang', this.hass?.language || 'en');

    return `${EMBED_URL}?${params.toString()}`;
  }

  private _renderForecast() {
    const title = localize(this.hass, 'component.windy-card.card.forecast_frame') ?? 'Windy Forecast';
    return this._renderIframeWithWrapper(this._forecastUrl, 185, title, false, false, false, false);
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

// A duplicate Lovelace resource entry loads this bundle twice. An unguarded define throws and
// takes the second copy down with it, so register only if nobody registered us before.
if (!customElements.get(ELEMENT_NAME)) {
  customElements.define(ELEMENT_NAME, WindyCard);
}

window.customCards = window.customCards || [];
// Same reason: a second evaluation would otherwise add a second picker entry for the same card,
// so the card appears twice in "Add card".
if (!window.customCards.some((card) => card.type === ELEMENT_NAME)) {
  window.customCards.push({
    type: ELEMENT_NAME,
    name: 'Windy Card',
    description: localize(undefined, 'component.windy-card.common.description'),
    documentationURL: 'https://github.com/timmaurice/lovelace-windy-card',
    preview: true,
  });
}
