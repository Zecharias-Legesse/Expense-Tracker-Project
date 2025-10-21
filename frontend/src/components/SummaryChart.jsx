import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const fmtUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function SummaryChart({ items = [], startingBalance = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    // 1) Net change per day (income +, expense -)
    const netByDay = new Map(); // yyyy-mm-dd -> number
    for (const t of items) {
      const d = new Date(t.date || t.createdAt);
      const key = d.toISOString().slice(0, 10); // yyyy-mm-dd
      const delta = (t.type === "income" ? 1 : -1) * Number(t.amount);
      netByDay.set(key, (netByDay.get(key) || 0) + delta);
    }

    // 2) Sort dates ascending so later dates are on the RIGHT
    const labels = Array.from(netByDay.keys()).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    // 3) Build the running balance series
    let running = startingBalance;
    const balance = labels.map((key) => (running += netByDay.get(key)));

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Balance",
            data: balance,
            fill: true,
            tension: 0.25,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${fmtUSD.format(ctx.parsed.y)}`,
            },
          },
        },
        scales: {
          y: {
            ticks: { callback: (v) => fmtUSD.format(v) },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [items, startingBalance]);

  return (
    <div className="card" style={{ height: 300 }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
