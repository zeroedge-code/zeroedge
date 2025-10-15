# ZeroEdge — Full Portfolio Bundle

This bundle includes:
- `/site` — your uploaded portfolio (original zip contents)
- `/aster-card` — the ASTER performance card (CoinGecko + ApexCharts)
- `server.js` — Express static server serving `/site` at root, `/aster-card` at `/aster-card`
- `Procfile`, `package.json` — ready for Railway deploy

## Run locally

```bash
npm install
npm start
# open http://localhost:3000
# your portfolio at / (serves /site)
# ASTER card at /aster-card
```

## Deploy to Railway

1. Push this folder to a Git repo
2. On Railway: New Project → Deploy from GitHub
3. It will use `web: node server.js` automatically
4. Open your Railway URL — portfolio at `/`, ASTER card at `/aster-card`

---
