
# Aster (ASTER) Live Growth Dashboard - Flask + ApexCharts

Displays your Aster (ASTER) portfolio with live CoinMarketCap data.

## Setup
1. Install dependencies:
   pip install -r requirements.txt

2. Set CoinMarketCap API key:
   export CMC_API_KEY="your_coinmarketcap_api_key"

3. Run:
   python app.py
   Visit http://localhost:8080

## Deploy on Railway
1. Push to GitHub
2. Create a Railway project
3. Add environment variable:
   CMC_API_KEY=your_coinmarketcap_api_key
4. Deploy.
