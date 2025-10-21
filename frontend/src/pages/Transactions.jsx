import { useCallback, useEffect, useMemo, useState } from "react";
import TransactionList from "../components/TransactionList.jsx";
import { getTransactions, deleteTransaction } from "../api.js";

export default function Transactions() {
  const [items, setItems] = useState([]);
  const load = useCallback(async () => {
    const { data } = await getTransactions();
    const sorted = [...data].sort(
      (a,b) => new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt)
    );
    setItems(sorted);
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id) => { await deleteTransaction(id); load(); };

  const { income, expense, balance } = useMemo(() => {
    const income = items.filter(t=>t.type==="income").reduce((s,t)=> s+Number(t.amount||0), 0);
    const expense = items.filter(t=>t.type==="expense").reduce((s,t)=> s+Number(t.amount||0), 0);
    return { income, expense, balance: income - expense };
  }, [items]);

  return (
    <>
      <header className="card" style={{ padding: "16px 20px" }}>
        <h1 style={{ margin:0 }}>All Transactions</h1>
        <p style={{ margin:"8px 0 0", color:"var(--muted)" }}>
          Income ${income.toFixed(0)} · Expenses ${expense.toFixed(0)} · Balance ${balance.toFixed(0)}
        </p>
      </header>

      <TransactionList items={items} onDelete={remove} />
    </>
  );
}
