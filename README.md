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
- **Map Reset Button** to quickly re-center and reset zoom without reloading the dashboard
- **Spot Forecast** view for a detailed point forecast at any location
- **Zone entity support** — point the map at any HA zone automatically
- **Marker & Spot detail** — pin a specific lat/lon for the marker and spot forecast popup
- **Conditional editor** — elevation and forecast model selectors only appear for compatible layers; map layers and display options are hidden when in `forecast_only` mode.
- **Accessibility** — Full keyboard navigation support (arrows, Home, End) for the mode switcher tabs.
- **Reliability** — Extensive test suite covering card logic, URL generation, and the configuration editor.
- **Pressure isolines** toggle (disabled automatically for radar/satellite)
- **Aspect ratio** or fixed pixel height for flexible layout. Maintains map and forecast dimensions seamlessly without layout shifts.
- **Fully translated** — English, French, and German

## Localization

- English
- French
- German

<details>
<summary>Contributing Translations</summary>

1. Fork the repository on GitHub.
2. Copy `src/translation/en.json` and rename it to your language code (e.g. `es.json`).
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

| Name        | Type   | Default     | Description                                                               |
| ----------- | ------ | ----------- | ------------------------------------------------------------------------- |
| `location`  | string | —           | HA zone or device_tracker entity to use as map center (overrides lat/lon) |
| `latitude`  | number | HA location | Map center latitude                                                       |
| `longitude` | number | HA location | Map center longitude                                                      |

### Map Layer

| Name             | Type   | Default   | Description                                                            |
| ---------------- | ------ | --------- | ---------------------------------------------------------------------- |
| `overlay_entity` | string | —         | HA entity whose state is used as the map overlay (overrides `overlay`) |
| `overlay`        | string | `wind`    | Weather layer (see full list below)                                    |
| `level`          | string | `surface` | Altitude level (only for compatible layers)                            |
| `product`        | string | `ecmwf`   | Forecast model (hidden for radar/satellite)                            |
| `zoom`           | number | `5`       | Zoom level (3–11)                                                      |

### Forecast Options

| Name               | Type   | Default | Description                                                       |
| ------------------ | ------ | ------- | ----------------------------------------------------------------- |
| `forecast_product` | string | `ecmwf` | Data provider for the spot forecast widget (e.g., AROME, ICON-D2) |

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

| Name            | Type    | Default | Description                                                   |
| --------------- | ------- | ------- | ------------------------------------------------------------- |
| `show_marker`   | boolean | `false` | Show a pin at the detail location                             |
| `show_spot`     | boolean | `false` | Show the spot forecast popup                                  |
| `show_pressure` | boolean | `false` | Overlay pressure isolines (not available for radar/satellite) |
| `hide_message`  | boolean | `false` | Hide the Windy promotional message                            |

### Available Layers (`overlay`)

**Core:** `wind`, `rain`, `temp`, `clouds`, `waves`, `raincum`, `gusts`, `windcum`, `cat`, `icing`, `radar`, `satellite`

**Atmosphere:** `snow`, `snowdepth`, `ptype`, `thunder`, `dewpoint`, `rh`, `freezing`, `wetbulb`, `fog`, `cloudtop`, `cloudbase`, `visibility`, `cap`, `thermals`, `hclouds`, `mclouds`, `lclouds`

**Solar & UV:** `solarpower`, `uv`

**Ocean:** `swell`, `swell2`, `swell3`, `wwave`, `sst`, `currents`, `tidalcurrents`

**Air Quality:** `no2`, `pm25`, `aerosol`, `ozone`, `so2`, `surfaceozone`, `co`, `dust`

**Other:** `pressure`, `extreme`, `warnings`, `drought`, `fire`

## Known Limitations

This card uses the free [Windy Embed Widget](https://embed.windy.com/config/map), which has strict functional limitations compared to the full Windy.com website or app:
- **Premium Login:** The embed widget does not support user authentication or token passing. Premium features, such as 1-hour forecast steps, are only available on the main Windy app.
- **Radar Units Support:** The radar overlay natively displays intensity in `dBZ` (unlike the full app's `mm/h` toggle). This is the intended behavior of the Windy Embed API. Unit settings configured on this card (`metric_rain`, etc.) serve as your preferred defaults for the spot forecast and other compatible overlays.
- **Satellite Spectrum:** Although Windy provides Blue, Visible, and Infrared satellite options, the embed iframe automatically strips or ignores external URL overrides (like `satelliteMode=IRBT`) and forces the default view. Toggling these maps must be done manually using the controls within the iframe.

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
