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
- **Marker & Spot detail** — pin a specific lat/lon for the marker and spot forecast popup
- **Conditional editor** — elevation and forecast model selectors only appear for compatible layers; map layers and display options are hidden when in `forecast_only` mode.
- **Accessibility** — Full keyboard navigation support (arrows, Home, End) for the mode switcher tabs.
- **Reliability** — Extensive test suite covering card logic, URL generation, and the configuration editor.
- **Pressure isolines** toggle (disabled automatically for radar/satellite)
- **Aspect ratio** or fixed pixel height for flexible layout. Maintains map and forecast dimensions seamlessly without layout shifts.

## Localization

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
4. Submit a pull request.

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

| Name             | Type   | Default   | Description                                                                                                                                                        |
| ---------------- | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `overlay_entity` | string | —         | HA entity whose state is used as the map overlay (overrides `overlay`)                                                                                             |
| `overlay`        | string | `wind`    | Weather layer to show on the map (see [Available Map Layers](#available-map-layers-overlay)).                                                                      |
| `level`          | string | `surface` | Altitude level (only for compatible layers)                                                                                                                        |
| `product`        | string | `ecmwf`   | Forecast model to display on the map (see [Available Forecast Models](#available-forecast-models-product--forecast_product)). Hidden for radar/satellite overlays. |
| `zoom`           | number | `5`       | Zoom level (3–11)                                                                                                                                                  |

### Forecast Options

| Name               | Type   | Default | Description                                                                                                                         |
| ------------------ | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `forecast_product` | string | `ecmwf` | Data provider for the spot forecast widget (see [Available Forecast Models](#available-forecast-models-product--forecast_product)). |

### View / Size

| Name           | Type    | Default | Description                                                                              |
| -------------- | ------- | ------- | ---------------------------------------------------------------------------------------- |
| `aspect_ratio` | string  | `16:9`  | Responsive ratio (`16:9`, `4:3`, `3:2`, `1:1`, `2:1`). Set to empty to use fixed height. |
| `height`       | number  | `450`   | Fixed height in px (used when aspect_ratio is empty)                                     |
| `no_padding`   | boolean | `false` | Remove padding and border from `ha-card` (applies to all modes)                          |

### Units

| Name          | Type   | Default   | Description                                             |
| ------------- | ------ | --------- | ------------------------------------------------------- |
| `metric_temp` | string | `default` | Temperature unit: `default`, `°C`, `°F`                 |
| `metric_rain` | string | `default` | Rain unit: `default`, `mm`, `in`                        |
| `metric_wind` | string | `default` | Wind unit: `default`, `kt`, `m/s`, `km/h`, `mph`, `bft` |

### Display Options

| Name            | Type    | Default | Description                                                                         |
| --------------- | ------- | ------- | ----------------------------------------------------------------------------------- |
| `static_map`    | boolean | `false` | Disable map interaction. Adds a high-contrast toggle button to the vertical toolbar |
| `autoplay`      | boolean | `false` | Automatically play the map animation                                                |
| `show_marker`   | boolean | `false` | Show a pin at the detail location                                                   |
| `show_spot`     | boolean | `false` | Show the spot forecast popup                                                        |
| `show_pressure` | boolean | `false` | Overlay pressure isolines (not available for radar/satellite)                       |
| `hide_message`  | boolean | `false` | Hide the Windy promotional message                                                  |

### Available Map Layers (`overlay`)

Below is the list of supported weather overlays for the `overlay` option:

<details>
<summary>Core Layers (Radar, Satellite, Wind, Temp, Waves, etc.)</summary>

| Value       | Label / Name               | Details                                               |
| ----------- | -------------------------- | ----------------------------------------------------- |
| `radar`     | Weather radar              | Real-time weather radar precipitation overlay         |
| `satellite` | Satellite                  | Real-time high-resolution satellite overlay           |
| `wind`      | Wind                       | Wind animations at selected altitudes                 |
| `rain`      | Rain, thunder              | Rain, snow, wet-bulb precipitation with thunderstorms |
| `temp`      | Temperature                | Air temperature at selected altitudes                 |
| `clouds`    | Clouds                     | Total cloud cover percentage                          |
| `waves`     | Waves                      | Combined wind waves and swell height                  |
| `raincum`   | Rain accumulation          | Accumulated precipitation over a selected timeframe   |
| `gusts`     | Wind gusts                 | Maximum wind gust speed                               |
| `windcum`   | Wind accumulation          | Accumulated wind run                                  |
| `cat`       | Clear air turbulence (CAT) | Turbulence severity index for aviation                |
| `icing`     | Icing severity             | Aviation ice accumulation index                       |

</details>

<details>
<summary>Atmosphere Layers (Snow, Humidity, Fog, Visibility, Storms, etc.)</summary>

| Value        | Label / Name      | Details                                                              |
| ------------ | ----------------- | -------------------------------------------------------------------- |
| `snow`       | New snow          | Expected new snowfall depth accumulation                             |
| `snowdepth`  | Snow depth        | Total snow cover depth                                               |
| `ptype`      | Precip. type      | Precipitation classification type (rain, freezing rain, sleet, snow) |
| `thunder`    | Thunderstorms     | Lighting strikes density indicator                                   |
| `dewpoint`   | Dew point         | Atmospheric dew point temperature                                    |
| `rh`         | Humidity          | Relative humidity percentage                                         |
| `freezing`   | Freezing altitude | Zero-degree isotherm elevation level                                 |
| `wetbulb`    | Wet-bulb temp.    | Thermodynamic wet-bulb temperature                                   |
| `fog`        | Fog               | Ground level fog density indicator                                   |
| `cloudtop`   | Cloud tops        | Top altitude of clouds                                               |
| `cloudbase`  | Cloud base        | Low-level cloud base altitude                                        |
| `visibility` | Visibility        | Ground horizontal visibility distance                                |
| `cap`        | CAPE Index        | Convective Available Potential Energy for storm instability          |
| `thermals`   | Thermals          | Thermal updraft speed and cloud base for soaring                     |
| `hclouds`    | High clouds       | High-altitude cloud cover percentage                                 |
| `mclouds`    | Medium clouds     | Mid-altitude cloud cover percentage                                  |
| `lclouds`    | Low clouds        | Low-altitude cloud cover percentage                                  |

</details>

<details>
<summary>Solar & UV Layers (Solar Power, UV Index)</summary>

| Value        | Label / Name | Details                               |
| ------------ | ------------ | ------------------------------------- |
| `solarpower` | Solar power  | Clear-sky downward solar radiation    |
| `uv`         | UV Index     | Ultraviolet radiation intensity index |

</details>

<details>
<summary>Ocean Layers (Swell, Wind Waves, Currents, Sea Temp)</summary>

| Value           | Label / Name    | Details                                   |
| --------------- | --------------- | ----------------------------------------- |
| `swell`         | Swell           | Primary swell wave height and direction   |
| `swell2`        | Swell 2         | Secondary swell wave height and direction |
| `swell3`        | Swell 3         | Tertiary swell wave height and direction  |
| `wwave`         | Wind waves      | Wind-generated local wave height          |
| `sst`           | Sea temperature | Sea surface temperature (SST)             |
| `currents`      | Currents        | Sea current speed and direction           |
| `tidalcurrents` | Tidal currents  | Local tide-driven current animations      |

</details>

<details>
<summary>Air Quality Layers (Particulates, Ozone, NO2, SO2, Dust, etc.)</summary>

| Value          | Label / Name     | Details                                       |
| -------------- | ---------------- | --------------------------------------------- |
| `no2`          | NO2              | Nitrogen dioxide surface concentration        |
| `pm25`         | PM2.5            | Fine particulate matter under 2.5 micrometers |
| `aerosol`      | Aerosol          | Aerosol optical depth (AOD) at 550nm          |
| `ozone`        | Ozone layer      | Total column ozone layer density              |
| `so2`          | SO2              | Sulfur dioxide surface concentration          |
| `surfaceozone` | Surface Ozone    | Ground-level ozone concentration              |
| `co`           | CO concentration | Carbon monoxide surface concentration         |
| `dust`         | Dust mass        | Total column atmospheric dust mass            |

</details>

<details>
<summary>Other Layers (Pressure, Anomalies, Alerts, Drought, Fire)</summary>

| Value      | Label / Name       | Details                                          |
| ---------- | ------------------ | ------------------------------------------------ |
| `pressure` | Pressure           | Sea-level atmospheric pressure isolines          |
| `extreme`  | Extreme forecast   | EFI (Extreme Forecast Index) anomalies indicator |
| `warnings` | Weather warnings   | Meteorological alerts overlay (CAP alerts)       |
| `drought`  | Drought monitoring | Soil moisture anomaly indicator                  |
| `fire`     | Fire danger        | Fire Weather Index (FWI) risk level              |

</details>

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

[![Star History Chart](https://api.star-history.com/svg?repos=timmaurice/lovelace-windy-card&type=Date)](https://star-history.com/#timmaurice/lovelace-windy-card)

## ☕ Support My Work

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="30" />](https://www.buymeacoffee.com/timmaurice)
