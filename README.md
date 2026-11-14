# Weltatlas Quiz (GeoQuiz)

Ein Geografie-Quiz im Browser mit 3D-Globus. Du übst Hauptstädte, Flaggen und die Lage von Ländern und Städten, lernst im Atlas und mit Karteikarten und siehst deinen Fortschritt in einer ausführlichen Statistik.

## Funktionen

- **Vier Spielmodi:** Hauptstädte, Flaggen, Länder finden, Städte finden. Jede Runde hat 10 Fragen, auf „Leicht“ (Auswahl) oder „Schwer“ (freie Eingabe).
- **3D-Globus und flache Karte:** umschaltbar, mit Markierung, Bestätigen-Knopf und Auflösung per Kamerafahrt.
- **Hinweise:** pro Frage bis zu zwei, mit Punktabzug.
- **Lernen:** Atlas mit Länderinfos (Einwohner, Sprachen nach Verbreitung sortiert, Währung mit Kurs zum Euro, Nachbarländer …) und Karteikarten mit Fächer-System.
- **Statistik:** Wissenskarte auf dem Globus, Genauigkeit nach Kontinent, Netzdiagramm, Verlauf getrennt nach Spielmodus, Entfernungsverlauf je Kartenmodus, Histogramm, Bestwerte, „Schwächen üben“.
- **Offline nutzbar:** Nach dem ersten Öffnen speichert die App alle Dateien (inklusive Flaggen, Karte und Globus) auf dem Gerät und läuft danach auch ohne Internet.
- **200 Länder und Gebiete:** alle UN-Staaten, dazu Vatikan, Grönland, Taiwan, Kosovo, Palästina, Westsahara und Somaliland. Im Lernen-Tab zeigt ein farbiger Punkt, ob ein Land allgemein anerkannt ist; in den Einstellungen lassen sich umstrittene und autonome Gebiete aus dem Spiel ausschließen.
- **Erfolge, Deutsch/Englisch, Hell/Dunkel/System.**
- **CSV-Export und -Import** der Statistik in den Einstellungen.

## Auf GitHub Pages veröffentlichen

1. Auf GitHub ein neues Repository anlegen, z. B. `geoquiz`.
2. Den **Inhalt** dieses Ordners ins Repository hochladen, sodass `index.html` direkt im Hauptverzeichnis liegt (nicht in einem Unterordner). Am einfachsten: auf der Repository-Seite **Add file → Upload files** und alle Dateien und Ordner hineinziehen. Die versteckte Datei `.nojekyll` muss mit hochgeladen werden.
3. **Settings → Pages** öffnen, unter **Build and deployment** die Quelle **Deploy from a branch** wählen, Branch `main` und Ordner `/ (root)`, dann **Save**.
4. Nach ein bis zwei Minuten ist die Seite unter `https://DEIN-NAME.github.io/geoquiz/` erreichbar.

Alle Pfade sind relativ, die App funktioniert also auch in einem Unterordner wie `/geoquiz/`.

## Lokal testen

Die Seite lädt Kartendaten und Texturen nach, deshalb funktioniert ein Doppelklick auf `index.html` nicht. Der Offline-Speicher (Service Worker) läuft nur über `https://` oder `localhost`. Starte im Ordner einen kleinen Webserver:

```bash
python3 -m http.server 8000
```

Dann `http://localhost:8000` im Browser öffnen.

## Als App installieren

- **iPhone / iPad (Safari):** Seite öffnen → Teilen-Symbol → **Zum Home-Bildschirm**. Die App startet dann im Vollbild mit dem GeoQuiz-Icon.
- **Mac (Safari ab macOS Sonoma):** Seite öffnen → Menü **Ablage → Zum Dock hinzufügen**.
- **Android / Chrome / Edge:** Browser-Menü → **App installieren** bzw. **Zum Startbildschirm hinzufügen**.

## Daten und Speicherung

Dein Fortschritt wird nur im Browser des jeweiligen Geräts gespeichert (`localStorage`). Es gibt keinen Server und kein Konto. Um Daten zu sichern oder auf ein anderes Gerät zu übertragen, nutze **Einstellungen → Statistik-Daten → CSV exportieren / importieren**.

Hinweis: Eine auf GitHub Pages installierte App hat einen eigenen Speicher. Fortschritt aus einer anderen Version (z. B. der Vorschau in Claude) überträgst du per CSV.

## Aufbau

```
index.html             Seite und App-Gerüst
css/style.css          Gestaltung (Farben, Layout, hell/dunkel)
js/countries.js        Länderdaten (Namen, Hauptstädte, Koordinaten, Fakten)
js/earth.js            3D-Globus und Karte (three.js)
js/app.js              Spiel, Lernen, Statistik, Einstellungen
js/lib/                three.js, d3, topojson-client (lokal, damit die App offline läuft)
sw.js                  Service Worker: speichert die App für die Offline-Nutzung
world.json             Ländergrenzen (TopoJSON)
tex/                   Erd-Texturen (Satellitenbild, Relief, Ozeanmaske, Wolken)
flags/                 Flaggen als SVG
icons/, favicon.ico    App-Icons
manifest.webmanifest   App-Angaben für „Zum Home-Bildschirm“
.nojekyll              sorgt dafür, dass GitHub Pages die Dateien unverändert ausliefert
```

Die Bibliotheken [three.js](https://threejs.org) 0.149 (MIT), [d3](https://d3js.org) 7.8.5 (ISC) und [topojson-client](https://github.com/topojson/topojson-client) (ISC) liegen im Ordner `js/lib`. Aus dem Netz kommen nur die Schriften (Google Fonts) und die aktuellen Wechselkurse; ohne Internet nutzt die App die zuletzt geladenen bzw. mitgelieferten Werte.

**Nach einem Update:** Lädst du neue Dateien hoch, holt sich die App sie beim nächsten Öffnen mit Internet automatisch. Bei hartnäckig alter Version die App einmal ganz schließen und neu öffnen.

## Quellen und Lizenzen

- Ländergrenzen: [world-atlas](https://github.com/topojson/world-atlas) (ISC) auf Basis von [Natural Earth](https://www.naturalearthdata.com) (gemeinfrei)
- Flaggen: [flag-icons](https://github.com/lipis/flag-icons) (MIT); Flagge von Somaliland für diese App selbst gezeichnet
- Kosovo und Somaliland haben in den Kartendaten keinen ISO-Code und bekommen intern die IDs 901 und 902. Die Grenze zwischen Marokko und Westsahara wurde entlang des 27°40′ N nachgezogen.
- Ländernamen, Sprachen, Währungen, Nachbarländer, Fläche: [mledoze/countries](https://github.com/mledoze/countries) (ODbL 1.0)
- Einwohner, BIP, Zeitzonen, Vorwahlen: [Countries States Cities Database](https://github.com/dr5hn/countries-states-cities-database) (ODbL 1.0)
- Koordinaten der Hauptstädte: [capitals-coordinates](https://github.com/Ginden/capitals) (WTFPL), einzelne Werte korrigiert
- Erd-Satellitenbild, Relief und Ozeanmaske: NASA Visible Earth „Blue Marble“ (gemeinfrei, NASA-Bilder unterliegen keinem Urheberrecht), in der aufbereiteten Fassung aus [three-globe](https://github.com/vasturiano/three-globe) (MIT)
- Wolken-Textur: eigens für diese App per Rauschfunktion erzeugt, frei verwendbar
- Sprachverbreitung zum Sortieren der Sprachen: [Unicode CLDR](https://cldr.unicode.org) (Unicode-Lizenz)
- Wechselkurse: [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api) (CC0), ein Stand ist mitgeliefert und wird online täglich aktualisiert

Die Länderdaten unter ODbL wurden für diese App zusammengeführt und gekürzt. Wer sie weiterverwendet, nennt bitte die Quellen oben.
