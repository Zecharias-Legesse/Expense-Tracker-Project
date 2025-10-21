import { useCallback, useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import { getTransactions, deleteTransaction } from "../api.js";

export default function Expenses() {
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    const { data } = await getTransactions();
    const sorted = [...data]
      .filter((t) => t.type === "expense")
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
          <h1 style={{ margin: 0 }}>Expenses</h1>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--danger)" }}>
            Total Expenses: - ${total.toFixed(0)}
          </div>
        </div>
      </header>

      <TransactionForm type="expense" onCreated={load} />
      <TransactionList items={items} onDelete={remove} />
    </>
  );
}
