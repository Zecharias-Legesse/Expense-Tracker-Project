import styled from "styled-components";

const Wrap = styled.div` padding:16px; display:grid; gap:14px; `;
const Item = styled.div`
  display:grid; grid-template-columns: 1fr auto; gap:14px; align-items:center;
  padding:14px 16px; border-radius:16px;
  background: var(--panel-2);
  border: 1px solid var(--border);
  .title{ font-weight:600; }
  .muted{ color:var(--muted); font-size:14px; }
  .row{ display:flex; gap:16px; align-items:center; flex-wrap:wrap; }
  .amount{ font-weight:700; }
`;
const Dot = styled.span`
  width:8px; height:8px; border-radius:9999px; display:inline-block;
  background:${p=> p.type==="income" ? "var(--success)" : "var(--danger)"};
  margin-right:6px; transform:translateY(-1px);
`;

export default function TransactionList({ items = [], onDelete }) {
  if (!items.length)
    return <div className="card" style={{ padding: 16 }}><em className="muted">No transactions yet.</em></div>;

  return (
    <div className="card">
      <Wrap>
        {items.map(t => {
          const dateStr = typeof t.date === "string"
            ? t.date
            : new Date(t.date).toLocaleDateString("en-CA");
          const amount = Number(t.amount || 0).toFixed(2);
          return (
            <Item key={t._id}>
              <div>
                <div className="title">
                  <Dot type={t.type} /> {t.note || "Transaction"}
                </div>
                <div className="row muted">
                  <span className="amount">
                    {t.type === "income" ? "+" : "-"}${amount}
                  </span>
                  <span>📅 {dateStr}</span>
                </div>
              </div>
              <button className="pill" title="Delete" onClick={() => onDelete(t._id)}>🗑️</button>
            </Item>
          );
        })}
      </Wrap>
    </div>
  );
}
