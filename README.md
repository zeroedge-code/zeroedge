# ZeroEdge — Carus-style Portfolio + ASTER Card

This project recreates a sleek portfolio dashboard inspired by Carus:
- Grid of asset cards with sparklines
- Top bar with total value and 24h change
- Detail area with 180-day chart + Entry & ATH markers
- Separate **ASTER** standalone card page
- Auto-refresh every 5 minutes
- Deploy-ready for **Railway** (Node/Express) or static hosts (Vercel)

## Configure your portfolio

Edit `portfolio.js`:

```js
window.PORTFOLIO = [
  { symbol: "ASTER", gecko: "astar", amount: 12500, entry: 0.70, ath: 2.45 },
  { symbol: "BTC", gecko: "bitcoin", amount: 0.05, entry: 30000, ath: 73738 },
  // ... add/remove assets
];
```

## Run locally

```bash
npm install
npm start
# http://localhost:3000
```

## Deploy to Railway

1. Push to a Git repository
2. Railway → New Project → Deploy from GitHub
3. It uses `web: node server.js` automatically
