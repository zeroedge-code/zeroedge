// ===== Portfolio Dashboard Logic =====
const fmtUSD = (v) => (v == null ? "—" : v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 6 }));
const fmtPct = (v) => (v == null ? "—" : `${v>0?'+':''}${v.toFixed(2)} %`);
const nowStr = () => new Date().toLocaleString();

const els = {
  cards: document.getElementById("cards"),
  totalValue: document.getElementById("totalValue"),
  dailyChange: document.getElementById("dailyChange"),
  lastUpdated: document.getElementById("lastUpdated"),
  refreshBtn: document.getElementById("refreshBtn"),
};

async function fetchPrices(ids) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids.join(','))}&vs_currencies=usd&include_24hr_change=true`;
  const r = await fetch(url, { headers: { "accept": "application/json" } });
  if (!r.ok) throw new Error("Price fetch failed");
  return r.json();
}

async function fetchChart(geckoId) {
  const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(geckoId)}/market_chart?vs_currency=usd&days=180&interval=daily`;
  const r = await fetch(url, { headers: { "accept": "application/json" } });
  if (!r.ok) throw new Error("Chart fetch failed");
  const j = await r.json();
  return (j.prices || []).map(([t, p]) => ({ x: new Date(t), y: p }));
}

function sparkOptions(data) {
  return {
    chart: { type: "area", height: 80, sparkline: { enabled: true } },
    series: [{ data: data.map(d => d.y) }],
    stroke: { curve: "smooth", width: 2 },
    colors: ["#6E56CF"],
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.02, stops: [0, 80, 100] } },
    tooltip: { enabled: false }
  };
}

let detailChart;

function detailOptions(series, entry, ath) {
  return {
    chart: { type: "area", height: "100%", toolbar: { show: false }, animations: { enabled: true }, foreColor: "#c9c9d9", fontFamily: "Inter, system-ui" },
    series: [{ name: "Price", data: series }],
    xaxis: { type: "datetime", labels: { datetimeUTC: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v) => v >= 1 ? `$${v.toFixed(2)}` : `$${v.toFixed(4)}` } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2.5 },
    colors: ["#6E56CF"],
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 80, 100] } },
    grid: { borderColor: "rgba(255,255,255,0.08)", strokeDashArray: 4 },
    annotations: {
      yaxis: [
        { y: entry, borderColor: "#38bdf8", label: { text: `Entry $${entry}`, style: { background: "#0b2137", color: "#e6f6ff" } } },
        { y: ath, borderColor: "#f59e0b", label: { text: `ATH $${ath}`, style: { background: "#291a00", color: "#fff7e6" } } }
      ]
    }
  };
}

function renderCards(portfolio, prices, charts) {
  els.cards.innerHTML = "";
  let total = 0;
  let change24 = 0;

  for (const asset of portfolio) {
    const p = prices[asset.gecko];
    const price = p?.usd ?? null;
    const ch = p?.usd_24h_change ?? 0;
    const val = price ? price * asset.amount : 0;
    total += val;
    change24 += (val * ch / 100);

    const spark = charts[asset.gecko] || [];
    const card = document.createElement("article");
    card.className = "card-mini";
    card.innerHTML = `
      <div class="top">
        <div class="name">
          <div class="logo">🌐</div>
          <div>
            <div><strong>${asset.symbol}</strong></div>
            <div class="muted">${fmtUSD(price)} • ${asset.amount.toLocaleString()} units</div>
          </div>
        </div>
        <span class="badge">${(((price-asset.entry)/asset.entry)*100).toFixed(1)} %</span>
      </div>
      <div id="spark-${asset.gecko}" class="spark"></div>
    `;
    card.addEventListener("click", async () => {
      // Update detail panel
      document.getElementById("detailTitle").textContent = `${asset.symbol}`;
      document.getElementById("detailEntry").textContent = fmtUSD(asset.entry);
      document.getElementById("detailAth").textContent = fmtUSD(asset.ath);
      document.getElementById("detailPrice").textContent = fmtUSD(price);
      const badge = document.getElementById("detailBadge");
      const ret = price && asset.entry ? ((price-asset.entry)/asset.entry)*100 : 0;
      badge.textContent = `${ret>=0?'+':''}${ret.toFixed(1)} %`;
      const series = charts[asset.gecko] || await fetchChart(asset.gecko);
      charts[asset.gecko] = series;
      if (!detailChart) {
        detailChart = new ApexCharts(document.querySelector("#detailChart"), detailOptions(series, asset.entry, asset.ath));
        detailChart.render();
      } else {
        detailChart.updateOptions(detailOptions(series, asset.entry, asset.ath), false, true);
      }
    });
    els.cards.appendChild(card);

    // sparkline
    const spEl = card.querySelector(`#spark-${asset.gecko}`);
    if (spark.length) {
      new ApexCharts(spEl, sparkOptions(spark)).render();
    }
  }

  els.totalValue.textContent = fmtUSD(total);
  const pct = total ? (change24/total)*100 : 0;
  els.dailyChange.textContent = fmtPct(pct);
  els.dailyChange.classList.toggle("up", pct>=0);
  els.dailyChange.classList.toggle("down", pct<0);
}

async function refreshAll() {
  try {
    const portfolio = window.PORTFOLIO;
    const ids = portfolio.map(a => a.gecko);
    const [prices, seriesList] = await Promise.all([
      fetchPrices(ids),
      Promise.all(ids.map(id => fetchChart(id)))
    ]);
    const charts = {};
    ids.forEach((id, i) => charts[id] = seriesList[i]);
    renderCards(portfolio, prices, charts);
    els.lastUpdated.textContent = nowStr();

    // Initialize detail with first asset
    const first = portfolio[0];
    if (first) {
      document.querySelectorAll(".card-mini")[0].click();
    }
  } catch (e) {
    console.error(e);
    els.lastUpdated.textContent = "Error — check console/network";
  }
}

els.refreshBtn.addEventListener("click", refreshAll);
refreshAll();
setInterval(refreshAll, window.REFRESH_MS);
