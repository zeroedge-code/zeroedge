
"use client";

import { useMemo, useState } from "react";
import data from "../../data/portfolio.json";
import type { Position } from "../lib/types";
import { NumberFmt } from "../components/Number";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

type Row = Position & {
  pnlPct: number;
  entryValue: number;
  currentValue: number;
};

const COLORS = ["#2563eb","#16a34a","#f59e0b","#ef4444","#10b981","#8b5cf6","#14b8a6","#f97316"];

export default function Page() {
  const [positions, setPositions] = useState<Position[]>(data.positions);

  const rows: Row[] = useMemo(() => positions.map(p => ({
    ...p,
    entryValue: p.entryPrice * p.quantity,
    currentValue: p.currentPrice * p.quantity,
    pnlPct: ((p.currentPrice - p.entryPrice) / p.entryPrice) * 100
  })), [positions]);

  const totals = useMemo(() => {
    const entry = rows.reduce((s, r) => s + r.entryValue, 0);
    const current = rows.reduce((s, r) => s + r.currentValue, 0);
    const pnlPct = entry === 0 ? 0 : ((current - entry) / entry) * 100;
    return { entry, current, pnlPct };
  }, [rows]);

  const weights = rows.map(r => ({ name: r.ticker, value: r.currentValue }));
  const perf = rows.map(r => ({ name: r.ticker, value: +r.pnlPct.toFixed(2) }));

  return (
    <main className="min-h-screen px-6 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Fonds-Portfolio</h1>
        <p className="text-gray-600">Stand: {data.asOf}</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl shadow border">
          <h2 className="font-semibold mb-3">Gesamtwert (Entry → Heute)</h2>
          <div className="text-3xl font-bold"><NumberFmt value={totals.current} prefix="€" /></div>
          <div className="text-sm text-gray-600">Entry: <NumberFmt value={totals.entry} prefix="€" /></div>
          <div className={`mt-1 inline-block rounded-full px-3 py-1 text-sm ${totals.pnlPct>=0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            Rendite gesamt: <NumberFmt value={totals.pnlPct} suffix="%" digits={2} />
          </div>
        </div>

        <div className="p-6 rounded-2xl shadow border">
          <h2 className="font-semibold mb-3">Gewicht nach aktuellem Wert</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie dataKey="value" data={weights} innerRadius={60} outerRadius={90} paddingAngle={1}>
                {weights.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number, n: string) => [`€${v.toLocaleString("de-DE",{maximumFractionDigits:0})}`, n]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 rounded-2xl shadow border">
          <h2 className="font-semibold mb-3">Rendite je Position</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={perf}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis unit="%" />
              <Tooltip formatter={(v: number) => [`${v}%`, "Rendite"]} />
              <Bar dataKey="value">
                {perf.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="overflow-x-auto rounded-2xl border">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm">
              <th className="p-3">Ticker</th>
              <th className="p-3">Name</th>
              <th className="p-3">Menge</th>
              <th className="p-3">Entry</th>
              <th className="p-3">Aktuell</th>
              <th className="p-3">Rendite</th>
              <th className="p-3">Entry-Datum</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-3 font-mono">{r.ticker}</td>
                <td className="p-3">{r.name ?? "-"}</td>
                <td className="p-3"><NumberFmt value={r.quantity} digits={0} /></td>
                <td className="p-3"><NumberFmt value={r.entryPrice} prefix="€" /></td>
                <td className="p-3"><NumberFmt value={r.currentPrice} prefix="€" /></td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-1 text-sm ${r.pnlPct>=0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    <NumberFmt value={r.pnlPct} suffix="%" />
                  </span>
                </td>
                <td className="p-3">{r.entryDate ?? "-"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 border-t">
            <tr>
              <td className="p-3 font-semibold" colSpan={3}>Total</td>
              <td className="p-3"><NumberFmt value={rows.reduce((s,r)=>s+r.entryValue,0)} prefix="€" /></td>
              <td className="p-3"><NumberFmt value={rows.reduce((s,r)=>s+r.currentValue,0)} prefix="€" /></td>
              <td className="p-3"><NumberFmt value={((rows.reduce((s,r)=>s+r.currentValue,0)-rows.reduce((s,r)=>s+r.entryValue,0))/rows.reduce((s,r)=>s+r.entryValue,0))*100} suffix="%" /></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="mt-10 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Daten pflegen</h3>
        <p>Bearbeite <code>data/portfolio.json</code>, um Positionen zu ändern. Felder: <code>ticker</code>, <code>name</code>, <code>quantity</code>, <code>entryPrice</code>, <code>currentPrice</code>, <code>entryDate</code> (optional).</p>
      </section>
    </main>
  );
}
