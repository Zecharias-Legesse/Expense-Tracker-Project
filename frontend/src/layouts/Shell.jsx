import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar.jsx";

export default function Shell() {
  return (
    <>
      {/* Brand header */}
      <header className="masthead">
        <div className="masthead__inner">
          <h1 className="masthead__brand">
            Productiv<span className="masthead__dot">•</span>Expense Tracker
          </h1>
        </div>
      </header>

      {/* Entire app block centered with even left/right space */}
      <div className="container">
        <div
          className="layout"
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            columnGap: 24,
            /* no fixed width here—container handles centering */
          }}
        >
          <Sidebar />
          <main style={{ display: "grid", gap: 16 }}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
