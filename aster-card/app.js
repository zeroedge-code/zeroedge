// === Config ===
// CoinGecko id for ASTER. If your token differs, set COINGECKO_ID accordingly.
const COINGECKO_ID = "astar"; // fallback guess for "ASTER" (ticker ASTR)
const VS_CURRENCY = "usd";
const ENTRY_PRICE = 0.70;
const ATH_PRICE = 2.45;
const REFRESH_MS = 5 * 60 * 1000; // 5 minutes

const els = {
  price: document.getElementById("price"),
  updated: document.getElementById("lastUpdated"),
  refreshBtn: document.getElementById("refreshBtn"),
};

let chart;

// Format helpers
const fmtUSD = (v) => (v == null ? "—" : v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 6 }));
const fmtTime = (t) => new Date(t).toLocaleString();

async function fetchPrice() {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(COINGECKO_ID)}&vs_currencies=${VS_CURRENCY}`;
  const r = await fetch(url, { headers: { "accept": "application/json" } });
  if (!r.ok) throw new Error("Price fetch failed");
  const j = await r.json();
  const v = j?.[COINGECKO_ID]?.[VS_CURRENCY];
  return v ?? null;
}

async function fetchChart() {
  const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(COINGECKO_ID)}/market_chart?vs_currency=${VS_CURRENCY}&days=180&interval=daily`;
  const r = await fetch(url, { headers: { "accept": "application/json" } });
  if (!r.ok) throw new Error("Chart fetch failed");
  const j = await r.json();
  // prices: [ [timestamp, price], ... ]
  return (j.prices || []).map(([t, p]) => ({ x: new Date(t), y: p }));
}

function renderChart(series) {
  const options = {
    chart: {
      type: "area",
      height: "100%",
      toolbar: { show: false },
      animations: { enabled: true },
      foreColor: "#c9c9d9",
      fontFamily: "Inter, system-ui, Segoe UI, Roboto, Arial, sans-serif",
      background: "transparent",
    },
    series: [
      {
        name: "Price",
        data: series,
      },
    ],
    xaxis: {
      type: "datetime",
      labels: { datetimeUTC: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (v) =>
          v >= 1 ? `$${v.toFixed(2)}` : `$${v.toFixed(4)}`,
      },
    },
    tooltip: {
      x: { format: "dd MMM yyyy HH:mm" },
      y: {
        formatter: (v) =>
          v >= 1 ? `$${v.toFixed(4)}` : `$${v.toFixed(6)}`,
      },
      theme: false,
    },
    grid: {
      borderColor: "rgba(255,255,255,0.08)",
      strokeDashArray: 4,
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    colors: ["#6E56CF"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.02,
        stops: [0, 80, 100],
        gradientToColors: ["#6E56CF"],
      },
    },
    annotations: {
      yaxis: [
        {
          y: ENTRY_PRICE,
          borderColor: "#38bdf8",
          label: {
            text: `Entry $${ENTRY_PRICE}`,
            style: { background: "#0b2137", color: "#e6f6ff" },
          },
        },
        {
          y: ATH_PRICE,
          borderColor: "#f59e0b",
          label: {
            text: `ATH $${ATH_PRICE}`,
            style: { background: "#291a00", color: "#fff7e6" },
          },
        },
      ],
    },
  };

  if (!chart) {
    chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  } else {
    chart.updateOptions(options, false, true);
  }
}

async function refreshAll() {
  try {
    const [price, series] = await Promise.all([fetchPrice(), fetchChart()]);
    if (price != null) els.price.textContent = fmtUSD(price);
    renderChart(series);
    els.updated.textContent = `Last update: ${fmtTime(Date.now())}`;
  } catch (e) {
    console.error(e);
    els.updated.textContent = "Last update: error — check console/network";
  }
}

els.refreshBtn.addEventListener("click", refreshAll);

// Kick off & interval
refreshAll();
setInterval(refreshAll, REFRESH_MS);
