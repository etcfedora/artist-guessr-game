# Rap Origins — VS Code Setup Tutorial

A complete guide to getting this project running locally.

---

## What You're Building

A browser-based geography quiz game. Each round shows a rap album cover with the artist's name hidden. You drop a pin on a world map to guess where they're from. The closer your pin, the more points you score. Five rounds per game, 5000 points max per round.

---

## Project Structure

```
rapper-geo-quiz/
├── index.html          ← All three screens (intro, game, final)
├── css/
│   └── style.css       ← All styling
├── js/
│   └── game.js         ← Game logic, scoring, map events
└── data/
    └── rappers.js      ← Rapper data (name, album, cover URL, coordinates)
```

---

## Step 1 — Install VS Code

If you don't have it already:

1. Go to https://code.visualstudio.com
2. Download the installer for your OS (Windows / Mac / Linux)
3. Run the installer and open VS Code

---

## Step 2 — Open the Project Folder

1. In VS Code, go to **File → Open Folder**
2. Navigate to and select the `rapper-geo-quiz` folder
3. Click **Open**

You should now see all four files in the Explorer panel on the left.

---

## Step 3 — Install the Live Server Extension

This is the key step. Because the game loads local files (the JS and CSS), simply double-clicking `index.html` won't work — browsers block local file imports for security. You need a local server.

**Install Live Server:**

1. Click the **Extensions** icon in the left sidebar (or press `Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for **Live Server** by Ritwick Dey
3. Click **Install**

---

## Step 4 — Launch the Game

1. Make sure `index.html` is open in the editor
2. Look at the very bottom of VS Code — you'll see a blue status bar
3. Click **"Go Live"** on the bottom right

Your default browser will open automatically at something like:

```
http://127.0.0.1:5500/index.html
```

The game should be fully working. Click **Start Game** to play.

> **Alternative launch method:** Right-click `index.html` in the Explorer panel and choose **"Open with Live Server"**

---

## Step 5 — Understanding the Code

### How the scoring works (`js/game.js`)

The `haversineKm()` function calculates the real-world distance in kilometres between two latitude/longitude points using the Haversine formula (accounts for Earth's curvature).

The `calcScore()` function converts that distance into points:

```js
function calcScore(km) {
  return Math.max(0, Math.round(5000 * Math.exp(-km / 2000)));
}
```

- **0 km away** → 5000 points (perfect)
- **~700 km away** → ~4000 points  
- **~1400 km away** → ~2500 points
- **~4000 km away** → ~1000 points
- **~10000 km away** → ~100 points

### How the map works

The game uses **Leaflet.js**, loaded via CDN in `index.html`. No API key needed. When you click the map, a gold marker drops at your click position. After you confirm, a green marker shows the true location and a dashed line connects them.

### How the rappers are loaded

`data/rappers.js` defines a global `RAPPERS` array. On game start, the array is shuffled and the first 5 rappers are picked for that session.

---

## Step 6 — Customising the Rapper List

Open `data/rappers.js` and add your own entries. Each rapper needs:

```js
{
  id: 11,                          // unique number
  name: "Tyler, the Creator",
  album: "Igor",
  year: 2019,
  coverUrl: "URL to album art",    // Wikipedia or any direct image URL
  origin: {
    lat: 34.0522,                  // latitude of hometown
    lng: -118.2437,
    label: "Los Angeles, California, USA"
  }
}
```

**Finding coordinates:**
- Go to https://maps.google.com
- Right-click anywhere on the map
- The first item in the context menu shows the latitude and longitude — click it to copy

**Finding album cover URLs:**
- Search for the album on Wikipedia
- Right-click the cover image → "Copy image address"
- Paste it as the `coverUrl` value

---

## Step 7 — Changing the Number of Rounds

In `js/game.js`, line 3:

```js
const ROUNDS = 5;
```

Change `5` to however many rounds you want. Make sure you have at least that many rappers in `data/rappers.js`.

---

## Step 8 — Tweaking the Scoring Curve

In `js/game.js`, the `calcScore` function controls difficulty:

```js
return Math.max(0, Math.round(5000 * Math.exp(-km / 2000)));
```

The `2000` is the **decay constant** — bigger number = more forgiving (you score more points for being far away). Try these values:

| Value | Feel |
|-------|------|
| `1000` | Brutal — being 500km off costs you heavily |
| `2000` | Default — balanced |
| `4000` | Casual — even 2000km off scores decently |

---

## Troubleshooting

**"The map is blank / not loading"**
→ Make sure you launched with Live Server, not by opening the HTML file directly. The browser tab URL should start with `http://`, not `file://`.

**"Album cover image doesn't appear"**
→ The Wikipedia image URL may have changed. Go to the album's Wikipedia page, right-click the cover, and update the URL in `rappers.js`.

**"I get a CORS error in the console"**
→ Same as above — use Live Server. CORS errors on local files go away on a proper local server.

**"The fonts aren't loading"**
→ You need an internet connection. The fonts load from Google Fonts via CDN. The game itself doesn't need internet except for fonts and map tiles.

---

## Going Further

Some ideas if you want to extend the project:

- **Timer mode** — add a countdown that docks points if you take too long
- **Difficulty levels** — Easy shows the rapper's country, Hard hides the album year
- **Local high scores** — use `localStorage` to save your best score between sessions
- **Mobile layout** — stack the panels vertically for phone screens using CSS `@media` queries
- **Sound effects** — play a snippet of one of their songs using the Web Audio API
