import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const Link = (to, label) => (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display:"block",
        padding:"10px 12px",
        borderRadius:12,
        textDecoration:"none",
        color:"var(--text)",
        background: isActive ? "var(--panel-2)" : "transparent",
        border: isActive ? "1px solid var(--border)" : "1px solid transparent",
        marginBottom:8
      })}
    >{label}</NavLink>
  );

  return (
    <aside style={{
      width:260, padding:20, borderRadius:24,
      background:"var(--panel)", border:"1px solid var(--border)",
      boxShadow:"0 10px 25px rgba(0,0,0,.25)", position:"sticky", top:20, alignSelf:"start"
    }}>
      {Link("/dashboard","Dashboard")}
      {Link("/transactions","View Transactions")}
      {Link("/incomes","Incomes")}
      {Link("/expenses","Expenses")}
    </aside>
  );
}
