
# zeroedge crypto — Live ASTER Price (Next.js 14 + Tailwind + Framer Motion)

Dark minimal site with a live ASTER price widget (CoinGecko, no API key).

## Quickstart
npm install
npm run dev
# http://localhost:3000

## Build & run
npm run build
npm start

## Deploy
- Vercel: import repo → build (`npm run build`) → start (`npm start`)
- Railway: Node project with the same commands

## Customize
- Branding & sections: `src/app/page.tsx`
- Colors/fonts: `tailwind.config.js`
- Price widget: `src/components/LivePrice.tsx`
