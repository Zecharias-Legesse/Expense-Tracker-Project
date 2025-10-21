import { useCallback, useEffect, useMemo, useState } from "react";
import SummaryChart from "../components/SummaryChart.jsx";
import { getTransactions } from "../api.js";

export default function Dashboard(){
  const [items, setItems] = useState([]);

  const load = useCallback(async ()=>{
    const { data } = await getTransactions();
    const sorted = [...data].sort(
      (a,b) => new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt)
    );
    setItems(sorted);
  },[]);
  useEffect(()=>{ load(); },[load]);

  const totals = useMemo(()=>{
    const income = items.filter(t=>t.type==="income").reduce((s,t)=>s+Number(t.amount||0),0);
    const expense = items.filter(t=>t.type==="expense").reduce((s,t)=>s+Number(t.amount||0),0);
    return { income, expense, balance: income - expense };
  },[items]);

  return (
    <>
      <header className="card" style={{ padding:"16px 20px" }}>
        <h1 style={{ margin:0 }}>All Transactions</h1>
      </header>

      <div className="card" style={{ height: 320, padding: 12 }}>
        <SummaryChart items={items} />
      </div>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3, 1fr)",
        gap:16
      }}>
        <div className="card" style={{ padding:16 }}>
          <h3>Total Income</h3>
          <div style={{ fontSize:36, fontWeight:800, color:"var(--success)" }}>
            ${totals.income.toFixed(0)}
          </div>
        </div>
        <div className="card" style={{ padding:16 }}>
          <h3>Total Expenses</h3>
          <div style={{ fontSize:36, fontWeight:800, color:"var(--danger)" }}>
            ${totals.expense.toFixed(0)}
          </div>
        </div>
        <div className="card" style={{ padding:16 }}>
          <h3>Total Balance</h3>
          <div style={{ fontSize:36, fontWeight:800 }}>
            ${totals.balance.toFixed(0)}
          </div>
        </div>
      </div>
    </>
  );
}

