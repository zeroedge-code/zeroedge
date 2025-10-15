# ZeroEdge — Crypto Performance Card (ASTER)

A lightweight, deploy‑ready widget showing:
- **Live price from CoinGecko**
- **180‑day performance chart** (ApexCharts, purple gradient)
- A **return badge** in your brand purple (`+100 %` by default)
- Markers for **Entry $0.70** and **ATH $2.45**
- **Auto‑refresh** every 5 minutes

## Configure

Open `app.js` and adjust:

```js
const COINGECKO_ID = "astar"; // set to your token's CoinGecko ID
const ENTRY_PRICE = 0.70;
const ATH_PRICE = 2.45;
const REFRESH_MS = 5 * 60 * 1000;
```

If your coin is different from Astar/ASTR, replace `COINGECKO_ID` with the correct CoinGecko slug.

## Run locally

Just open `index.html` in a browser, or serve statically:

```bash
python3 -m http.server 5173
# open http://localhost:5173
```

## Deploy to Vercel (static)

1. New Project → “Import” the folder
2. Framework: **Other**
3. Build & Output Settings: none (static)
4. Deploy

## Deploy to Railway (Node static server)

This repo includes a tiny Express server:
- `server.js` serves the static files from the project root
- `Procfile` sets the web process

**Steps**

1. Push this folder to a Git repo.
2. In Railway, “New Project” → “Deploy from GitHub”
3. Set start command automatically from `Procfile`

## Files

- `index.html` — markup and chart container
- `styles.css` — layout and brand purple styling
- `app.js` — CoinGecko fetch, chart, annotations, auto‑refresh
- `server.js`, `package.json`, `Procfile` — optional Node server for Railway
- `vercel.json` — optional, zero‑config for static deploy

---

Made for ZeroEdge 💎
