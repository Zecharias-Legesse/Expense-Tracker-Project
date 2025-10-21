import GlobalStyle from "./styles/GlobalStyle.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Shell from "./layouts/Shell.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Incomes from "./pages/Incomes.jsx";
import Expenses from "./pages/Expenses.jsx";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </>
  );
}