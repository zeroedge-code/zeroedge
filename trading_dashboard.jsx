import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function TradingDashboard() {
  const commissionRate = 0.3;
  const totalMargin = 4840 + 4198;

  const [closedTrades, setClosedTrades] = useState([
    { date: "2025-10-31", exchange: "Asterdex", symbol: "ADAUSDT", side: "Sell", leverage: "8x", mode: "Cross", size: -11761.56, pnl: 825.72, roe: 18.14, hasCommission: true },
    { date: "2025-10-31", exchange: "Asterdex", symbol: "AAVEUSDT", side: "Sell", leverage: "8x", mode: "Cross", size: -34786.65, pnl: 2235.69, roe: 8.29, hasCommission: true },
    { date: "2025-11-01 14:43:46", exchange: "Kucoin", symbol: "ARBUSDT Perp", side: "Long", leverage: "10x", mode: "Cross", size: 366.23, pnl: 366.23, roe: 10.19, hasCommission: true },
    { date: "2025-10-28 22:03:27", exchange: "Kucoin", symbol: "UNIUSDT Perp", side: "Long", leverage: "Isolated", mode: "Isolated", size: -1207.19, pnl: -1207.19, roe: -37.84, hasCommission: false },
    { date: "2025-10-28 17:09:15", exchange: "Kucoin", symbol: "XTZUSDT Perp", side: "Long", leverage: "Isolated", mode: "Isolated", size: -504.98, pnl: -504.98, roe: -13.75, hasCommission: false },
    { date: "2025-10-27 09:29:34", exchange: "Kucoin", symbol: "XTZUSDT Perp", side: "Long", leverage: "Isolated", mode: "Isolated", size: -135.95, pnl: -135.95, roe: -6.19, hasCommission: false },
    { date: "2025-10-27 08:42:39", exchange: "Kucoin", symbol: "COTIUSDT Perp", side: "Long", leverage: "Isolated", mode: "Isolated", size: -563.16, pnl: -563.16, roe: -25.50, hasCommission: false },
    { date: "2025-10-26 17:18:35", exchange: "Kucoin", symbol: "XTZUSDT Perp", side: "Long", leverage: "Isolated", mode: "Isolated", size: -27.19, pnl: -27.19, roe: -1.22, hasCommission: false },
    { date: "2025-10-25 16:46:56", exchange: "Kucoin", symbol: "BNBUSDT Perp", side: "Long", leverage: "Cross", mode: "Cross", size: -42.10, pnl: -42.10, roe: -1.87, hasCommission: false },
    { date: "2025-10-25 16:38:41", exchange: "Kucoin", symbol: "BNBUSDT Perp", side: "Long", leverage: "Isolated", mode: "Isolated", size: -61.10, pnl: -61.10, roe: -4.40, hasCommission: false },
    { date: "2025-10-25 16:37:47", exchange: "Kucoin", symbol: "TAOUSDT Perp", side: "Long", leverage: "Isolated", mode: "Isolated", size: -15.57, pnl: -15.57, roe: -1.62, hasCommission: false }
  ]);

  const [openTrades, setOpenTrades] = useState([
    { date: "2025-11-01", exchange: "Asterdex", symbol: "BTCUSDT", side: "Buy", leverage: "12x", mode: "Isolated", size: 4840, pnl: 0.0, roe: 0.0 },
    { date: "2025-11-01 15:00:00", exchange: "Kucoin", symbol: "BTCUSDT Perp", side: "Long", leverage: "15x", mode: "Cross", size: 4198, pnl: -7.53, roe: -0.17 }
  ]);

  const calcTotals = (trades, includeMargin = true) => {
    const totalPnl = trades.reduce((acc, t) => acc + t.pnl, 0);
    const commission = trades.reduce((acc, t) => acc + (t.hasCommission && t.pnl > 0 ? t.pnl * commissionRate : 0), 0);
    const net = totalPnl - commission;
    const totalMarginUsed = includeMargin ? trades.reduce((acc, t) => acc + (t.size || 0), 0) : 0;
    return { totalPnl, commission, net, totalMarginUsed };
  };

  const closedTotals = calcTotals(closedTrades, false);
  const openTotals = calcTotals(openTrades, true);
  const availableBalance = totalMargin - openTotals.totalMarginUsed;

  const renderTable = (trades) => (
    <table className="w-full text-[11px] text-left border-collapse font-mono text-[#00ffcc]">
      <thead>
        <tr className="bg-[#002a1c] text-[#00ff88] border-b border-[#00ff88]/30 uppercase tracking-wide">
          <th className="px-2 py-2">Date</th>
          <th className="px-2 py-2">Exchange</th>
          <th className="px-2 py-2">Symbol</th>
          <th className="px-2 py-2">Side</th>
          <th className="px-2 py-2">Leverage</th>
          <th className="px-2 py-2">Mode</th>
          <th className="px-2 py-2">Size</th>
          <th className="px-2 py-2">PNL</th>
          <th className="px-2 py-2">ROE%</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((t, i) => (
          <motion.tr key={i} className="border-b border-[#004d3a]/50 hover:bg-[#003322] transition-colors" whileHover={{ scale: 1.01 }}>
            <td className="px-2 py-2">{t.date}</td>
            <td className="px-2 py-2">{t.exchange}</td>
            <td className="px-2 py-2 font-bold text-[#ffffff]">{t.symbol}</td>
            <td className={t.side === "Buy" || t.side === "Long" ? "px-2 py-2 text-[#00ff88] font-semibold" : "px-2 py-2 text-[#ff4d4d] font-semibold"}>{t.side}</td>
            <td className="px-2 py-2">{t.leverage}</td>
            <td className="px-2 py-2">{t.mode}</td>
            <td className="px-2 py-2">{t.size}</td>
            <td className={t.pnl >= 0 ? "px-2 py-2 text-[#00ff88]" : "px-2 py-2 text-[#ff4d4d]"}>{t.pnl}</td>
            <td className={t.roe >= 0 ? "px-2 py-2 text-[#00ffff]" : "px-2 py-2 text-[#ff4d4d]"}>{t.roe}%</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-[#000a07] text-[#00ffcc] font-mono p-6 grid gap-6">
      <div className="text-2xl font-bold text-[#00ff88] drop-shadow-[0_0_8px_#00ff88] mb-4 text-center tracking-wide">BLOOMBERG // ZEROEDGE TERMINAL</div>
      <Card className="bg-[#001a14] border border-[#00ff88]/30 shadow-[0_0_20px_rgba(0,255,136,0.2)] rounded-lg mb-4">
        <CardContent className="flex justify-between items-center p-4 text-[#00ffcc] text-sm">
          <div>Total Margin: <span className="text-[#00ff88] font-bold">{totalMargin.toFixed(2)} USDT</span></div>
          <div>Available Balance: <span className="text-[#ffcc00] font-bold">{availableBalance.toFixed(2)} USDT</span></div>
        </CardContent>
      </Card>

      <Tabs defaultValue="closed" className="w-full">
        <TabsList className="bg-[#001f16] border border-[#00ff88]/30 text-[#00ff88] mb-6 rounded-lg">
          <TabsTrigger value="closed">Closed Trades</TabsTrigger>
          <TabsTrigger value="open">Open Trades</TabsTrigger>
        </TabsList>
        <TabsContent value="closed">{renderTable(closedTrades)}</TabsContent>
        <TabsContent value="open">{renderTable(openTrades)}</TabsContent>
      </Tabs>
    </div>
  );
}
