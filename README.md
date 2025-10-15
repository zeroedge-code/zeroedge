
# Portfolio Website (Next.js + Tailwind + Recharts)

Eine minimalistische Seite, um ein Fonds-Portfolio mit Entry-Preis, aktuellem Preis und Rendite je Position zu präsentieren.

## Tech-Stack

- **Next.js 14 (App Router)**
- **React 18**
- **Tailwind CSS**
- **Recharts** (für Charts)

## Lokale Entwicklung

```bash
pnpm i   # oder: npm i / yarn
pnpm dev # http://localhost:3000
```

## Daten bearbeiten

Öffne `data/portfolio.json` und passe die Positionen an. Felder:
- `ticker` (z. B. "AAPL")
- `name` (optional)
- `quantity` (Stückzahl)
- `entryPrice` (Entry-Preis je Stück)
- `currentPrice` (aktueller Preis je Stück)
- `entryDate` (optional, ISO-Datum "YYYY-MM-DD")

## Deployment auf GitHub & Railway

1. **Repository erstellen & pushen**
   ```bash
   git init
   git add .
   git commit -m "initial"
   git branch -M main
   git remote add origin <DEIN_GITHUB_REPO_URL>
   git push -u origin main
   ```

2. **Railway**  
   - Neues Projekt → "Deploy from GitHub" → Repo auswählen  
   - Build: `npm install && npm run build`  
   - Start: `npm start`  
   - Node Version (optional): `20.x`  
   - Railway setzt automatisch `PORT`; Next.js nutzt diesen beim `start`-Script.

3. **(Optional) GitHub Pages (statisch)**
   Dieses Projekt rendert serverseitig. Für reine statische Auslieferung wäre eine Vite-Variante sinnvoll. Bei Bedarf kann eine SPA-Version bereitgestellt werden.

## Anpassungen

- **Branding**: Farben/Fonts via `tailwind.config.js`.
- **Weitere Charts**: In `src/app/page.tsx` mit `recharts` hinzufügen.
- **Datenquelle**: Statt lokaler JSON-Datei kann eine API angebunden werden.

## Lizenz

MIT
