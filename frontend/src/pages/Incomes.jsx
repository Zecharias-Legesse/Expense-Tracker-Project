import { useCallback, useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import { getTransactions, deleteTransaction } from "../api.js";

export default function Incomes() {
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    const { data } = await getTransactions();
    const sorted = [...data]
      .filter((t) => t.type === "income")
      .sort(
        (a, b) =>
          new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt)
      );
    setItems(sorted);
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    await deleteTransaction(id);
    load();
  };

  const total = items.reduce((s, t) => s + Number(t.amount || 0), 0);

  return (
    <>
      <header className="card" style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0 }}>Incomes</h1>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--success)" }}>
            Total Income: ${total.toFixed(0)}
          </div>
        </div>
      </header>

      <TransactionForm type="income" onCreated={load} />
      <TransactionList items={items} onDelete={remove} />
    </>
  );
}
