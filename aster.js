// Standalone ASTER card logic
const els = {
  price: document.getElementById("price"),
  updated: document.getElementById("cardLastUpdated"),
};

const fmtUSD = (v) => (v == null ? "—" : v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 6 }));
const fmtTime = (t) => new Date(t).toLocaleString();

async function fetchPrice() {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(COINGECKO_ID)}&vs_currencies=usd`;
  const r = await fetch(url, { headers: { "accept": "application/json" } });
  if (!r.ok) throw new Error("Price fetch failed");
  const j = await r.json();
  return j?.[COINGECKO_ID]?.usd ?? null;
}

async function fetchChart() {
  const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(COINGECKO_ID)}/market_chart?vs_currency=usd&days=180&interval=daily`;
  const r = await fetch(url, { headers: { "accept": "application/json" } });
  if (!r.ok) throw new Error("Chart fetch failed");
  const j = await r.json();
  return (j.prices || []).map(([t, p]) => ({ x: new Date(t), y: p }));
}

function renderChart(series) {
  const opts = {
    chart: { type: "area", height: "100%", toolbar: { show: false }, foreColor: "#c9c9d9", fontFamily: "Inter, system-ui" },
    series: [{ name: "Price", data: series }],
    xaxis: { type: "datetime", labels: { datetimeUTC: false } },
    yaxis: { labels: { formatter: (v) => v >= 1 ? `$${v.toFixed(2)}` : `$${v.toFixed(6)}` } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2.5 },
    colors: ["#6E56CF"],
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 80, 100] } },
    grid: { borderColor: "rgba(255,255,255,0.08)", strokeDashArray: 4 },
    annotations: {
      yaxis: [
        { y: ENTRY_PRICE, borderColor: "#38bdf8", label: { text: `Entry $${ENTRY_PRICE}`, style: { background: "#0b2137", color: "#e6f6ff" } } },
        { y: ATH_PRICE, borderColor: "#f59e0b", label: { text: `ATH $${ATH_PRICE}`, style: { background: "#291a00", color: "#fff7e6" } } }
      ]
    }
  };
  new ApexCharts(document.querySelector("#chart"), opts).render();
}

async function refreshAll() {
  try {
    const [price, series] = await Promise.all([fetchPrice(), fetchChart()]);
    if (price != null) document.getElementById("price").textContent = fmtUSD(price);
    renderChart(series);
    els.updated.textContent = `Last update: ${fmtTime(Date.now())}`;
  } catch (e) {
    console.error(e);
    els.updated.textContent = "Last update: error — check console/network";
  }
}

refreshAll();
setInterval(refreshAll, REFRESH_MS);
