import { useState } from "react";
import styled from "styled-components";
import { createTransaction } from "../api.js";

const Box = styled.div` padding:16px; `;
const Row = styled.div`
  display:grid; grid-template-columns: 1.4fr .9fr 1fr auto;
  gap:12px; align-items:center;
`;

export default function TransactionForm({ type = "expense", onCreated }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [description, setDescription] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!title || !amount) return;
    await createTransaction({
      amount: Number(amount),
      type,                              // "income" or "expense"
      note: description || title,        // backend still uses "note"
      date                               // YYYY-MM-DD
    });
    setTitle(""); setAmount(""); setDescription("");
    onCreated?.();
  }

  return (
    <div className="card">
      <Box>
        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <Row>
            <input className="input" placeholder="Title"
              value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="input" type="number" step="0.01" placeholder="Amount"
              value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input className="input" type="date" value={date}
              onChange={(e) => setDate(e.target.value)} />
            <button className="btn" type="submit">+ Add {type === "income" ? "Income" : "Expense"}</button>
          </Row>

          <textarea className="input" rows={4} placeholder="Add a Description"
            value={description} onChange={(e) => setDescription(e.target.value)} />
        </form>
      </Box>
    </div>
  );
}
