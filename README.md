
# Astar (ASTR) Portfolio Dashboard - Flask + ApexCharts

This Flask app shows your Astar coin position using live data from CoinMarketCap.

## Setup
1. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
2. Set your CoinMarketCap API key:
   ```bash
   export CMC_API_KEY="your_coinmarketcap_api_key"
   ```
3. Run locally:
   ```bash
   python app.py
   ```
   Visit http://localhost:8080

## Deployment on Railway
1. Push this folder to GitHub
2. Create a new Railway project
3. Add environment variable:
   ```
   CMC_API_KEY=your_coinmarketcap_api_key
   ```
4. Deploy!

Railway will use Python 3.10 and the Procfile to start the app.
