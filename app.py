from flask import Flask, render_template
import requests, os, json
from datetime import datetime

app = Flask(__name__)

ENTRY_PRICE = 0.70
QUANTITY = 8090
SYMBOL = "ASTER"
CMC_API_KEY = os.getenv("CMC_API_KEY")
CMC_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
HISTORY_FILE = "data.json"

def get_current_price():
    headers = {"X-CMC_PRO_API_KEY": CMC_API_KEY} if CMC_API_KEY else {}
    params = {"symbol": SYMBOL, "convert": "USD"}
    try:
        r = requests.get(CMC_URL, headers=headers, params=params, timeout=5)
        r.raise_for_status()
        data = r.json()
        return data["data"][SYMBOL]["quote"]["USD"]["price"]
    except Exception as e:
        print("⚠️ Using fallback price:", e)
        return 0.1

def save_price_history(price):
    today = datetime.utcnow().strftime("%Y-%m-%d")
    entry_value = ENTRY_PRICE * QUANTITY
    current_value = price * QUANTITY

    record = {"date": today, "price": round(price, 4), "value": round(current_value, 2)}

    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "r") as f:
            history = json.load(f)
    else:
        history = []

    if not any(r["date"] == today for r in history):
        history.append(record)
        with open(HISTORY_FILE, "w") as f:
            json.dump(history, f, indent=2)
    return history

@app.route("/")
def index():
    price = get_current_price()
    history = save_price_history(price)

    entry_value = ENTRY_PRICE * QUANTITY
    current_value = price * QUANTITY
    pnl_pct = ((price - ENTRY_PRICE) / ENTRY_PRICE) * 100

    info = {
        "symbol": SYMBOL,
        "entry_price": ENTRY_PRICE,
        "current_price": round(price, 4),
        "quantity": QUANTITY,
        "entry_value": round(entry_value, 2),
        "current_value": round(current_value, 2),
        "pnl_pct": round(pnl_pct, 2),
        "history": history,
    }
    return render_template("index.html", info=info)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
