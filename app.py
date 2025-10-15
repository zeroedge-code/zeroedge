
from flask import Flask, render_template
import requests, os

app = Flask(__name__)

ENTRY_PRICE = 0.70
QUANTITY = 1000
SYMBOL = "ASTR"
CMC_API_KEY = os.getenv("CMC_API_KEY")
CMC_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"

@app.route("/")
def index():
    headers = {"X-CMC_PRO_API_KEY": CMC_API_KEY} if CMC_API_KEY else {}
    params = {"symbol": SYMBOL, "convert": "USD"}
    current_price = 0.10
    try:
        r = requests.get(CMC_URL, headers=headers, params=params, timeout=5)
        r.raise_for_status()
        data = r.json()
        current_price = data["data"][SYMBOL]["quote"]["USD"]["price"]
    except Exception as e:
        print("⚠️  Using fallback price:", e)

    entry_value = ENTRY_PRICE * QUANTITY
    current_value = current_price * QUANTITY
    pnl_pct = ((current_price - ENTRY_PRICE) / ENTRY_PRICE) * 100

    info = {
        "symbol": SYMBOL,
        "entry_price": ENTRY_PRICE,
        "current_price": round(current_price, 4),
        "quantity": QUANTITY,
        "entry_value": round(entry_value, 2),
        "current_value": round(current_value, 2),
        "pnl_pct": round(pnl_pct, 2)
    }
    return render_template("index.html", info=info)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
