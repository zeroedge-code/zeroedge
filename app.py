from flask import Flask, render_template
import requests, os, json
from datetime import datetime, timedelta

app = Flask(__name__)

# === Configuration ===
ENTRY_PRICE = 0.70         # your buy price
QUANTITY = 8900            # how many coins
ENTRY_DATE = "2025-09-19"  # starting date of investment
SYMBOL = "ASTER"
CMC_API_KEY = os.getenv("CMC_API_KEY")
CMC_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
HISTORY_FILE = "price_history.json"

# === Fetch price ===
def get_live_price():
    headers = {"X-CMC_PRO_API_KEY": CMC_API_KEY}
    params = {"symbol": SYMBOL, "convert": "USD"}
    try:
        r = requests.get(CMC_URL, headers=headers, params=params, timeout=10)
        r.raise_for_status()
        data = r.json()
        return round(data["data"][SYMBOL]["quote"]["USD"]["price"], 6)
    except Exception as e:
        print("⚠️ Fallback price used:", e)
        return 0.10

# === Update daily history ===
def update_history(price):
    today = datetime.utcnow().strftime("%Y-%m-%d")
    record = {"date": today, "price": price, "value": round(price * QUANTITY, 2)}

    # Load or initialize
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "r") as f:
            history = json.load(f)
    else:
        # initialize from ENTRY_DATE with entry price
        history = [{"date": ENTRY_DATE, "price": ENTRY_PRICE, "value": round(ENTRY_PRICE * QUANTITY, 2)}]

    # Append today's record if not already there
    if not any(r["date"] == today for r in history):
        history.append(record)
        with open(HISTORY_FILE, "w") as f:
            json.dump(history, f, indent=2)

    return history

@app.route("/")
def index():
    live_price = get_live_price()
    history = update_history(live_price)

    entry_value = ENTRY_PRICE * QUANTITY
    current_value = live_price * QUANTITY
    pnl_pct = ((live_price - ENTRY_PRICE) / ENTRY_PRICE) * 100

    info = {
        "symbol": SYMBOL,
        "entry_price": ENTRY_PRICE,
        "entry_date": ENTRY_DATE,
        "current_price": live_price,
        "quantity": QUANTITY,
        "entry_value": round(entry_value, 2),
        "current_value": round(current_value, 2),
        "pnl_pct": round(pnl_pct, 2),
        "history": history
    }
    return render_template("index.html", info=info)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
