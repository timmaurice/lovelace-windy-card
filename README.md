# Windy Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=flat-square)](https://github.com/hacs/integration)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/timmaurice/lovelace-windy-card?style=flat-square)
[![GH-downloads](https://img.shields.io/github/downloads/timmaurice/lovelace-windy-card/total?style=flat-square)](https://github.com/timmaurice/lovelace-windy-card/releases)
[![GH-last-commit](https://img.shields.io/github/last-commit/timmaurice/lovelace-windy-card.svg?style=flat-square)](https://github.com/timmaurice/lovelace-windy-card/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/timmaurice/lovelace-windy-card.svg?style=flat-square)](https://github.com/timmaurice/lovelace-windy-card)
![GitHub](https://img.shields.io/github/license/timmaurice/lovelace-windy-card?style=flat-square)

A Lovelace card that embeds the [Windy.com](https://www.windy.com) interactive weather map and spot forecast directly into your Home Assistant dashboard.

<img src="https://raw.githubusercontent.com/timmaurice/lovelace-windy-card/main/screenshot.png" alt="Card Screenshot" />

## Features

- **Interactive Windy Map** with 50+ weather layers (wind, rain, temperature, radar, satellite, air quality, and more)
- **Map Reset Button** to quickly re-center and reset zoom.
- **Interaction Toggle** to lock/unlock map panning and zooming with clear visual state (`lock` / `lock-open-variant`).
- **Spot Forecast** view for a detailed point forecast at any location
- **Zone entity support** — point the map at any HA zone automatically
- **Entity-driven overlay** — switch the weather layer from an HA entity's state
- **Overlay looping** — cycle through a sequence of weather layers on a timer
- **Marker & Spot detail** — pin a specific lat/lon for the marker and spot forecast popup
- **Conditional editor** — elevation and forecast model selectors only appear for compatible layers; map layers and display options are hidden when in `forecast_only` mode.
- **Accessibility** — Full keyboard navigation support (arrows, Home, End) for the mode switcher tabs.
- **Reliability** — Extensive test suite covering card logic, URL generation, and the configuration editor.
- **Pressure isolines** toggle (disabled automatically for radar/satellite)
- **Aspect ratio** or fixed pixel height for flexible layout. Maintains map and forecast dimensions seamlessly without layout shifts.

## Localization

- Catalan
- Chinese (Simplified)
- Chinese (Traditional)
- Danish
- Dutch
- English
- French
- German
- Italian
- Spanish

<details>
<summary>Contributing Translations</summary>

1. Fork the repository on GitHub.
2. Copy `src/translation/en.json` and rename it to your language code (e.g. `pt.json`).
3. Translate all values.
4. Register the file in `src/localize.ts` (import it and add it to the `translations` map, using the language code Home Assistant reports in `hass.language`).
5. Submit a pull request.

</details>

## Installation

### HACS (Recommended)

This card is available in the [Home Assistant Community Store (HACS)](https://hacs.xyz/).

<a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=timmaurice&repository=lovelace-windy-card&category=plugin" target="_blank" rel="noreferrer noopener"><img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Open your Home Assistant instance and open a repository inside the Home Assistant Community Store." /></a>

<details>
<summary>Manual Installation</summary>

1. Download `windy-card.js` from the latest release.
2. Place it in your `config/www` directory.
3. Add the resource under `Settings` → `Dashboards` → `...` → `Resources`:
   - URL: `/local/windy-card.js`
   - Resource Type: `JavaScript Module`

</details>

## Configuration

The card is fully configurable through the Lovelace UI editor. Options are organized into collapsible sections.

### Main Options

| Name           | Type   | Default      | Description                                                   |
| -------------- | ------ | ------------ | ------------------------------------------------------------- |
| `type`         | string | **Required** | `custom:windy-card`                                           |
| `title`        | string | —            | Card title                                                    |
| `default_mode` | string | `map`        | `map`, `forecast`, `map_only` (no toggle), or `forecast_only` |

### Location

| Name              | Type   | Default        | Description                                                                                                           |
| ----------------- | ------ | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| `location`        | string | —              | HA zone or device_tracker entity to use as map center (overrides lat/lon)                                             |
| `latitude`        | number | HA location    | Map center latitude                                                                                                   |
| `longitude`       | number | HA location    | Map center longitude                                                                                                  |
| `update_interval` | number | `0` (disabled) | Throttling interval in seconds to rate-limit map/forecast updates caused by frequently changing states or coordinates |

### Map Layer

| Name                 | Type   | Default   | Description                                                                                                                                                                                |
| -------------------- | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `overlay_entity`     | string | —         | HA entity whose state is used as the map overlay (overrides `overlay`). A state that is not a layer — including `unavailable` and `unknown` — keeps `overlay` and is reported on the card. |
| `overlay`            | string | `wind`    | Weather layer to show on the map (see [Available Map Layers](#available-map-layers-overlay)).                                                                                              |
| `level`              | string | `surface` | Altitude level (only for compatible layers)                                                                                                                                                |
| `product`            | string | `ecmwf`   | Forecast model to display on the map (see [Available Forecast Models](#available-forecast-models-product--forecast_product)). Hidden for radar/satellite overlays.                         |
| `zoom`               | number | `5`       | Zoom level (3–11)                                                                                                                                                                          |
| `overlay_loop`       | list   | —         | Sequence of weather layers to automatically cycle through (overrides `overlay` and `overlay_entity`). Can be a YAML list or a comma-separated string.                                      |
| `overlay_loop_delay` | number | `30`      | Time in seconds to show each layer in the `overlay_loop` before switching to the next one                                                                                                  |

### Forecast Options

| Name               | Type   | Default | Description                                                                                                                         |
| ------------------ | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `forecast_product` | string | `ecmwf` | Data provider for the spot forecast widget (see [Available Forecast Models](#available-forecast-models-product--forecast_product)). |

### View / Size

| Name           | Type    | Default | Description                                                                                      |
| -------------- | ------- | ------- | ------------------------------------------------------------------------------------------------ |
| `aspect_ratio` | string  | —       | Responsive ratio of the **map** (`16:9`, `4:3`, `3:2`, `1:1`, `2:1`). New cards start at `16:9`. |
| `height`       | number  | —       | Fixed height in px. Takes precedence over `aspect_ratio`.                                        |
| `no_padding`   | boolean | `false` | Remove padding and border from `ha-card` (applies to all modes)                                  |

`height` wins wherever both are set — clear it to go back to a responsive card. With
neither, the map falls back to 450px.

`aspect_ratio` applies to the map only. The spot forecast is a fixed-layout widget and keeps its
own height (185px, or `height` if you set one) in every mode.

### Units

| Name          | Type   | Default   | Description                                             |
| ------------- | ------ | --------- | ------------------------------------------------------- |
| `metric_temp` | string | `default` | Temperature unit: `default`, `°C`, `°F`                 |
| `metric_rain` | string | `default` | Rain unit: `default`, `mm`, `in`                        |
| `metric_wind` | string | `default` | Wind unit: `default`, `kt`, `m/s`, `km/h`, `mph`, `bft` |

### Display Options

| Name                     | Type    | Default | Description                                                                         |
| ------------------------ | ------- | ------- | ----------------------------------------------------------------------------------- |
| `static_map`             | boolean | `false` | Disable map interaction. Adds a high-contrast toggle button to the vertical toolbar |
| `autoplay`               | boolean | `false` | Automatically play the map animation                                                |
| `show_marker`            | boolean | `false` | Show a pin at the detail location                                                   |
| `show_spot`              | boolean | `false` | Show the spot forecast popup                                                        |
| `show_pressure`          | boolean | `false` | Overlay pressure isolines (not available for radar/satellite)                       |
| `hide_message`           | boolean | `false` | Hide the Windy promotional message                                                  |
| `hide_fullscreen_button` | boolean | `false` | Remove the full screen button from the map toolbar (also disables double-tap)       |
| `allow_geolocation`      | boolean | `false` | Let Windy use your precise location instead of guessing it from your IP (see below) |

#### Precise location (`allow_geolocation`)

Grants the Windy iframe the browser's geolocation permission, so the **radar** overlay's location dot lands on your actual position instead of the IP-based guess (see [Known Limitations](#known-limitations)). Two caveats:

- **HTTPS only, and it fails silently.** Geolocation requires a secure context. Over plain `http://<local-ip>:8123` you get _no prompt, no error, and no change_ — the dot simply stays IP-located, which looks exactly like a broken option rather than an unavailable one. If nothing happens, check the address bar first: you need Nabu Casa, a reverse proxy with TLS, or local TLS. (`http://localhost:8123` counts as secure.) The card logs a warning to the browser console in this case.
- **The browser will prompt.** You get a one-time location request on the Home Assistant origin. That is why the option is off by default. The permission is per-origin, so if you reach Home Assistant on both a local address and a remote one, only the secure origin gets the accurate dot.

### Full Screen

The map toolbar has a full screen button (<kbd>⛶</kbd>) that expands the map to fill the whole screen — handy on wall tablets. Press it again or hit <kbd>Esc</kbd> to go back.

- Where the browser supports the Fullscreen API, the card also requests native full screen so the browser chrome disappears. Where it does not (iOS/iPadOS webviews, the Home Assistant Companion app), the map still expands to cover the viewport.
- **Double-tap** on the map toggles full screen too, but only while the interaction lock is active (`static_map: true` or the padlock button). An unlocked Windy map handles the gesture itself and never passes it on.
- The button is available on the map panel only — the spot forecast is a fixed-height widget that gains nothing from being stretched.
- Set `hide_fullscreen_button: true` to remove the button (and the double-tap gesture) entirely.

On touch devices the toolbar buttons are always visible, since there is no hover state to reveal them.

### Available Map Layers (`overlay`)

Below is the list of supported weather overlays for the `overlay` option. The **Value** column is what the visual editor writes into your YAML; the **Alias** column lists the older, friendlier name that the card still accepts and translates for you.

<details>
<summary>Core Layers (Radar, Satellite, Wind, Temp, Waves, etc.)</summary>

| Value        | Alias     | Label / Name               | Details                                               |
| ------------ | --------- | -------------------------- | ----------------------------------------------------- |
| `radar`      | —         | Weather radar              | Real-time weather radar precipitation overlay         |
| `satellite`  | —         | Satellite                  | Real-time high-resolution satellite overlay           |
| `wind`       | —         | Wind                       | Wind animations at selected altitudes                 |
| `rain`       | —         | Rain, thunder              | Rain, snow, wet-bulb precipitation with thunderstorms |
| `temp`       | —         | Temperature                | Air temperature at selected altitudes                 |
| `clouds`     | —         | Clouds                     | Total cloud cover percentage                          |
| `waves`      | —         | Waves                      | Combined wind waves and swell height                  |
| `rainAccu`   | `raincum` | Rain accumulation          | Accumulated precipitation over a selected timeframe   |
| `gust`       | `gusts`   | Wind gusts                 | Maximum wind gust speed                               |
| `gustAccu`   | `windcum` | Wind accumulation          | Accumulated wind run                                  |
| `turbulence` | `cat`     | Clear air turbulence (CAT) | Turbulence severity index for aviation                |
| `icing`      | —         | Icing severity             | Aviation ice accumulation index                       |

</details>

<details>
<summary>Atmosphere Layers (Snow, Humidity, Fog, Visibility, Storms, etc.)</summary>

| Value         | Alias       | Label / Name      | Details                                                              |
| ------------- | ----------- | ----------------- | -------------------------------------------------------------------- |
| `snowAccu`    | `snow`      | New snow          | Expected new snowfall depth accumulation                             |
| `snowcover`   | `snowdepth` | Snow depth        | Total snow cover depth                                               |
| `ptype`       | —           | Precip. type      | Precipitation classification type (rain, freezing rain, sleet, snow) |
| `thunder`     | —           | Thunderstorms     | Lighting strikes density indicator                                   |
| `dewpoint`    | —           | Dew point         | Atmospheric dew point temperature                                    |
| `rh`          | —           | Humidity          | Relative humidity percentage                                         |
| `deg0`        | `freezing`  | Freezing altitude | Zero-degree isotherm elevation level                                 |
| `wetbulbtemp` | `wetbulb`   | Wet-bulb temp.    | Thermodynamic wet-bulb temperature                                   |
| `fog`         | —           | Fog               | Ground level fog density indicator                                   |
| `cloudtop`    | —           | Cloud tops        | Top altitude of clouds                                               |
| `cbase`       | `cloudbase` | Cloud base        | Low-level cloud base altitude                                        |
| `visibility`  | —           | Visibility        | Ground horizontal visibility distance                                |
| `cape`        | `cap`       | CAPE Index        | Convective Available Potential Energy for storm instability          |
| `ccl`         | `thermals`  | Thermals          | Thermal updraft speed and cloud base for soaring                     |
| `hclouds`     | —           | High clouds       | High-altitude cloud cover percentage                                 |
| `mclouds`     | —           | Medium clouds     | Mid-altitude cloud cover percentage                                  |
| `lclouds`     | —           | Low clouds        | Low-altitude cloud cover percentage                                  |

</details>

<details>
<summary>Solar & UV Layers (Solar Power, UV Index)</summary>

| Value        | Alias | Label / Name | Details                               |
| ------------ | ----- | ------------ | ------------------------------------- |
| `solarpower` | —     | Solar power  | Clear-sky downward solar radiation    |
| `uvindex`    | `uv`  | UV Index     | Ultraviolet radiation intensity index |

</details>

<details>
<summary>Ocean Layers (Swell, Wind Waves, Currents, Sea Temp)</summary>

| Value          | Alias           | Label / Name    | Details                                   |
| -------------- | --------------- | --------------- | ----------------------------------------- |
| `swell1`       | `swell`         | Swell           | Primary swell wave height and direction   |
| `swell2`       | —               | Swell 2         | Secondary swell wave height and direction |
| `swell3`       | —               | Swell 3         | Tertiary swell wave height and direction  |
| `wwaves`       | `wwave`         | Wind waves      | Wind-generated local wave height          |
| `sst`          | —               | Sea temperature | Sea surface temperature (SST)             |
| `currents`     | —               | Currents        | Sea current speed and direction           |
| `currentsTide` | `tidalcurrents` | Tidal currents  | Local tide-driven current animations      |

</details>

<details>
<summary>Air Quality Layers (Particulates, Ozone, NO2, SO2, Dust, etc.)</summary>

| Value    | Alias          | Label / Name     | Details                                       |
| -------- | -------------- | ---------------- | --------------------------------------------- |
| `no2`    | —              | NO2              | Nitrogen dioxide surface concentration        |
| `pm2p5`  | `pm25`         | PM2.5            | Fine particulate matter under 2.5 micrometers |
| `aod550` | `aerosol`      | Aerosol          | Aerosol optical depth (AOD) at 550nm          |
| `gtco3`  | `ozone`        | Ozone layer      | Total column ozone layer density              |
| `tcso2`  | `so2`          | SO2              | Sulfur dioxide surface concentration          |
| `go3`    | `surfaceozone` | Surface Ozone    | Ground-level ozone concentration              |
| `cosc`   | `co`           | CO concentration | Carbon monoxide surface concentration         |
| `dustsm` | `dust`         | Dust mass        | Total column atmospheric dust mass            |

</details>

<details>
<summary>Other Layers (Pressure, Anomalies, Alerts, Drought, Fire)</summary>

| Value       | Alias      | Label / Name       | Details                                          |
| ----------- | ---------- | ------------------ | ------------------------------------------------ |
| `pressure`  | —          | Pressure           | Sea-level atmospheric pressure isolines          |
| `efiWind`   | `extreme`  | Extreme forecast   | EFI (Extreme Forecast Index) anomalies indicator |
| `capAlerts` | `warnings` | Weather warnings   | Meteorological alerts overlay (CAP alerts)       |
| `drought40` | `drought`  | Drought monitoring | Soil moisture anomaly indicator                  |
| `fwi`       | `fire`     | Fire danger        | Fire Weather Index (FWI) risk level              |

</details>

Overlay values are matched case-insensitively, so `rainaccu` and `rainAccu` both work. A few Windy overlay ids that the editor does not offer are recognised too and can be set by hand: `efiTemp`, `efiRain`, `soilMoisture40`, `soilMoisture100`, `moistureAnom40` and `moistureAnom100`. Any other value is lower-cased and handed to Windy as-is.

### Available Forecast Models (`product` / `forecast_product`)

Below is the list of supported forecast models and data providers. Regional models automatically fall back to global models if the map center coordinates are outside their geographic coverage zone.

<details>
<summary>View available forecast models</summary>

| Value       | Label / Name       | Coverage / Region    | Details                                                              |
| ----------- | ------------------ | -------------------- | -------------------------------------------------------------------- |
| `ecmwf`     | ECMWF              | Global               | European Centre for Medium-Range Weather Forecasts (Global standard) |
| `gfs`       | GFS                | Global               | Global Forecast System (US NOAA standard)                            |
| `icon`      | ICON               | Global               | German DWD model (Global resolution)                                 |
| `iconEu`    | ICON-EU            | Europe               | German DWD model (European resolution)                               |
| `iconD2`    | ICON-D2            | Germany & Alps       | German DWD model (Very high resolution local)                        |
| `arome`     | AROME              | France & Alps        | Météo-France high-resolution regional model                          |
| `aladin`    | ALADIN             | Central Europe       | ALADIN consortium high-resolution regional model                     |
| `nems`      | METEOBLUE          | Global (Multi-model) | Swiss high-precision multi-model point forecast (Meteoblue)          |
| `nam`       | NAM                | North America        | North American Mesoscale model (US NOAA regional)                    |
| `hrrr`      | HRRR               | North America        | High-Resolution Rapid Refresh model (US NOAA local)                  |
| `ukv`       | UKV                | United Kingdom       | UK Met Office high-resolution local model                            |
| `bomAccess` | ACCESS (Australia) | Australia            | Bureau of Meteorology high-resolution local model                    |

</details>

## Known Limitations

<details>
<summary>View known limitations</summary>

This card uses the free [Windy Embed Widget](https://embed.windy.com/config/map), which has strict functional limitations compared to the full Windy.com website or app:

- **Premium Login:** The embed widget does not support user authentication or token passing. Premium features, such as 1-hour forecast steps, are only available on the main Windy app.
- **Radar Units Support:** The radar overlay natively displays intensity in `dBZ` (unlike the full app's `mm/h` toggle). This is the intended behavior of the Windy Embed API. Unit settings configured on this card (`metric_rain`, etc.) serve as your preferred defaults for the spot forecast and other compatible overlays.
- **Satellite Spectrum:** Although Windy provides Blue, Visible, and Infrared satellite options, the embed iframe automatically strips or ignores external URL overrides (like `satelliteMode=IRBT`) and forces the default view. Toggling these maps must be done manually using the controls within the iframe.
- **Superpose Radar:** The "Superpose Radar" toggle available on the full Windy.com satellite view is intentionally excluded from the free embed widget. It is unfortunately not possible to inject this button or combined overlay into the Home Assistant card.
- **"Your location" dot:** Windy draws a pulsating location dot that the card cannot switch off. It has two sources — the **radar** overlay always geolocates the viewer, and the **spot forecast** marks the point it is reporting for. Neither can be suppressed: Windy exposes no parameter for it, the map runs in a cross-origin `<iframe>` so the card cannot reach in and hide it, and the forecast dot is inseparable from the meteogram (Windy needs those coordinates to draw it at all).

  The radar dot is usually in the _wrong place_ as well — often tens of kilometres off, at your ISP's hub. Browsers do not show the location prompt to a cross-origin iframe unless the embedding page delegates the permission, so Windy falls back to locating you by IP address. [`allow_geolocation: true`](#precise-location-allow_geolocation) delegates it and the dot moves to your real position. The dot cannot be removed, but it can at least be correct.

</details>

## Examples

### Basic Map

```yaml
type: custom:windy-card
title: Local Weather
overlay: wind
zoom: 7
aspect_ratio: '16:9'
```

### Pinned Location with Spot Forecast

```yaml
type: custom:windy-card
title: Mountain Forecast
latitude: 47.421
longitude: 10.985
show_spot: true
overlay: wind
level: 850h
zoom: 8
```

### Zone-Based Map

```yaml
type: custom:windy-card
title: Home Area
location: zone.home
overlay: rain
zoom: 6
aspect_ratio: '4:3'
```

### Air Quality View

```yaml
type: custom:windy-card
title: Air Quality
overlay: pm25
zoom: 5
metric_wind: km/h
hide_message: true
```

### Automatic Overlay Looping Switch

Show the wind overlay for 15 seconds, followed by rain for 15 seconds, and then temperature for 15 seconds.

```yaml
type: custom:windy-card
title: Weather Sequence
overlay_loop:
  - wind
  - rain
  - temp
overlay_loop_delay: 15
zoom: 6
```

## Development

<details>
<summary>Setup</summary>

1. Clone the repository:

   ```bash
   git clone https://github.com/timmaurice/lovelace-windy-card.git
   cd lovelace-windy-card
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the watch server:

   ```bash
   npm run watch
   ```

4. Point your HA Lovelace resource to `dist/windy-card.js`.

</details>

---

For issues or feature requests, visit the [GitHub repository](https://github.com/timmaurice/lovelace-windy-card).

## ☕ Support My Work

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="30" />](https://www.buymeacoffee.com/timmaurice)
