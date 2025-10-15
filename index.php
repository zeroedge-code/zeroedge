<?php
$portfolio = [
    [
        "ticker" => "ASTR",
        "name" => "Astar",
        "quantity" => 1000,
        "entryPrice" => 0.70,
        "currentPrice" => 0.10,
        "entryDate" => "2024-01-01"
    ]
];

$totalEntry = 0;
$totalCurrent = 0;

foreach ($portfolio as $p) {
    $totalEntry += $p["entryPrice"] * $p["quantity"];
    $totalCurrent += $p["currentPrice"] * $p["quantity"];
}

$totalReturn = $totalEntry == 0 ? 0 : (($totalCurrent - $totalEntry) / $totalEntry) * 100;
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio – Astar</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-light text-dark">
<div class="container py-5">
  <h1 class="mb-4">Portfolio Übersicht</h1>

  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title">Gesamtentwicklung</h5>
      <p class="card-text">
        <strong>Entry-Wert:</strong> $<?= number_format($totalEntry, 2) ?><br>
        <strong>Aktueller Wert:</strong> $<?= number_format($totalCurrent, 2) ?><br>
        <strong>Rendite:</strong>
        <span class="<?= $totalReturn >= 0 ? 'text-success' : 'text-danger' ?>">
          <?= number_format($totalReturn, 2) ?>%
        </span>
      </p>
      <canvas id="performanceChart" height="80"></canvas>
    </div>
  </div>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Ticker</th>
        <th>Name</th>
        <th>Menge</th>
        <th>Entry</th>
        <th>Aktuell</th>
        <th>Rendite</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($portfolio as $p): 
        $pnl = (($p["currentPrice"] - $p["entryPrice"]) / $p["entryPrice"]) * 100;
      ?>
      <tr>
        <td><?= htmlspecialchars($p["ticker"]) ?></td>
        <td><?= htmlspecialchars($p["name"]) ?></td>
        <td><?= number_format($p["quantity"], 0) ?></td>
        <td>$<?= number_format($p["entryPrice"], 2) ?></td>
        <td>$<?= number_format($p["currentPrice"], 2) ?></td>
        <td class="<?= $pnl >= 0 ? 'text-success' : 'text-danger' ?>">
          <?= number_format($pnl, 2) ?>%
        </td>
      </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</div>

<script>
const ctx = document.getElementById('performanceChart');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [<?php foreach ($portfolio as $p) echo "'".$p["ticker"]."',"; ?>],
        datasets: [{
            label: 'Rendite (%)',
            data: [<?php foreach ($portfolio as $p) echo round((($p["currentPrice"] - $p["entryPrice"]) / $p["entryPrice"]) * 100, 2).","; ?>],
            backgroundColor: ['rgba(25,135,84,0.7)','rgba(220,53,69,0.7)'],
            borderColor: '#fff',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: { beginAtZero: true }
        }
    }
});
</script>

</body>
</html>
