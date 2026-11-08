# World Atlas Quiz (GeoQuiz)

A geography quiz in your browser featuring a 3D globe. Practice capitals, flags, and the locations of countries and cities. Learn with an interactive atlas and flashcards, and track your progress with detailed statistics.

### ▶ [Play now](https://the00eht.github.io/Geo-Quiz/)

No download, no account required. Works in any browser. Available in English and German.

## Features

- **Four game modes:** Capitals, Flags, Find Countries, and Find Cities. Each round consists of 10 questions, with two difficulty levels: "Easy" (multiple choice) and "Hard" (free input).
- **3D globe and flat map:** Switch between both views, place markers, confirm your answers, and reveal the correct location with an animated camera flight.
- **Hints:** Up to two hints per question, each with a point penalty.
- **Learning:** An atlas with country information (population, languages sorted by prevalence, currency with exchange rates against the euro, neighboring countries, etc.) and flashcards with a spaced-repetition box system.
- **Statistics:** Knowledge map on the globe, accuracy by continent, radar chart, progress over time broken down by game mode, distance history for each map mode, histogram, personal bests, and a "Practice Weak Areas" feature.
- **Works offline:** After the first visit, the app saves all files (including flags, maps, and the globe) to your device and works without an internet connection.
- **Achievements, English/German, Light/Dark/System themes.**
- **CSV export and import** of statistics in the settings.

## Install as an App

- **iPhone / iPad (Safari):** Open the website → Tap the Share icon → Select **Add to Home Screen**. The app will then launch in full-screen mode with the GeoQuiz icon.
- **Mac (Safari, macOS Sonoma or later):** Open the website → Select **File → Add to Dock** from the menu.
- **Android / Chrome / Edge:** Open the browser menu → Select **Install app** or **Add to Home screen**.

## Data and Storage

Your progress is stored only in the browser on the respective device (`localStorage`). There is no server and no account.

To back up your data or transfer it to another device, use **Settings → Statistics Data → Export CSV / Import CSV**.

Note: An app installed from GitHub Pages has its own separate storage. To transfer progress from another version (e.g. the preview in Claude), use the CSV export/import feature.

## Project Structure

```text
index.html              Page and app framework
css/style.css           Styling (colors, layout, light/dark themes)
js/countries.js         Country data (names, capitals, coordinates, facts)
js/earth.js              3D globe and map (three.js)
js/app.js                Game, learning, statistics, settings
js/lib/                  three.js, d3, topojson-client
                         (stored locally for offline use)
sw.js                    Service Worker: caches the app for offline use
world.json               Country borders (TopoJSON)
tex/                     Earth textures (satellite imagery,
                         relief, ocean mask, clouds)
flags/                   Flags as SVG files
icons/, favicon.ico      App icons
manifest.webmanifest     App metadata for "Add to Home Screen"
.nojekyll                Ensures GitHub Pages serves files unchanged
```

The libraries [three.js](https://threejs.org) 0.149 (MIT), [d3](https://d3js.org) 7.8.5 (ISC), and [topojson-client](https://github.com/topojson/topojson-client) (ISC) are located in the `js/lib` folder.

The only resources loaded from the internet are fonts (Google Fonts) and current exchange rates. When offline, the app uses the most recently downloaded or bundled values.

**After an update:** When you upload new files, the app automatically downloads them the next time it is opened with an internet connection. If the old version persists, completely close the app and reopen it.

## Sources and Licenses

- **Country borders:** [world-atlas](https://github.com/topojson/world-atlas) (ISC), based on [Natural Earth](https://www.naturalearthdata.com) (public domain)
- **Flags:** [flag-icons](https://github.com/lipis/flag-icons) (MIT)
- **Country names, languages, currencies, neighboring countries, area:** [mledoze/countries](https://github.com/mledoze/countries) (ODbL 1.0)
- **Population, GDP, time zones, calling codes:** [Countries States Cities Database](https://github.com/dr5hn/countries-states-cities-database) (ODbL 1.0)
- **Capital city coordinates:** [capitals-coordinates](https://github.com/Ginden/capitals) (WTFPL); individual values have been corrected where necessary
- **Earth satellite imagery, relief, and ocean mask:** NASA Visible Earth "Blue Marble" (public domain; NASA images are not subject to copyright), in the processed version from [three-globe](https://github.com/vasturiano/three-globe) (MIT)
- **Cloud texture:** Generated specifically for this app using a noise function; free to use
- **Language prevalence data for sorting languages:** [Unicode CLDR](https://cldr.unicode.org) (Unicode License)
- **Exchange rates:** [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api) (CC0); one dataset is bundled and updated daily online

The country data licensed under ODbL has been consolidated and abridged for this app. If you reuse this data, please credit the sources listed above.