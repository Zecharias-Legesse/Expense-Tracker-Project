import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root{
    /* Navy palette */
    --bg:#0b1220;          /* page background */
    --panel:#0e1628;       /* cards / panels */
    --panel-2:#0b1324;     /* subtle alt panel */
    --border:#1c2741;      /* borders */
    --text:#e5e7eb;        /* primary text */
    --muted:#94a3b8;       /* secondary text */
    --primary:#3b82f6;     /* blue accents */
    --success:#22c55e;
    --danger:#ef4444;
    --ring: rgba(59,130,246,0.35);
  }

  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
    color: var(--text);
    background: radial-gradient(1200px 800px at 20% -10%, #101a33 0%, transparent 60%),
                radial-gradient(1200px 800px at 120% 10%, #0c1831 0%, transparent 55%),
                var(--bg);
  }

  /* Generic surfaces */
  .card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
    color: var(--text);
  }

  /* Controls */
  .input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: #0b1020;
    color: var(--text);
    outline: none;
  }
  .input::placeholder { color: #70809b; }
  .input:focus { box-shadow: 0 0 0 4px var(--ring); border-color: var(--primary); }

  .btn {
    border: 0;
    padding: 10px 16px;
    border-radius: 12px;
    background: var(--primary);
    color: #031225;
    font-weight: 700;
    cursor: pointer;
  }

  .pill{
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  display: inline-flex;              
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid var(--border);
  color: var(--text);
  background: #0b1020;

  /* fix font/emoji baseline quirks */
  padding: 0;
  line-height: 1;
  font-size: 18px;
  vertical-align: middle;
  appearance: none;
}
.pill:focus { outline: none; box-shadow: 0 0 0 4px var(--ring); }

  }
.brandbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:16px 20px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,.25);
}
.brand{
  font-size: 22px;
  font-weight: 800;
  letter-spacing: .3px;
  color: var(--text);
}
/* ===== Brand Bar ===== */
.brandbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:22px 26px;
  background: linear-gradient(135deg, #0f1a34 0%, #0b1220 60%);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,0.03);
}

.brand{
  display:flex;
  align-items:baseline;
  gap:14px;
  user-select:none;
}

/* Big logotype */
.brand__mark{
  font-size: clamp(28px, 4.2vw, 40px);   /* scales nicely */
  font-weight: 900;
  letter-spacing: .3px;
  line-height: 1;
  background: linear-gradient(90deg, #7dd3fc 0%, #60a5fa 35%, #a78bfa 90%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;                     /* gradient text */
  text-shadow: 0 4px 24px rgba(96,165,250,.25);
}

/* Accent dot after the name */
.brand__dot{
  color:#60a5fa;
  font-size: clamp(26px, 3.6vw, 36px);
  line-height: 1;
  transform: translateY(-2px);
  filter: drop-shadow(0 0 10px rgba(96,165,250,.35));
}

/* Descriptor */
.brand__tag{
  color: var(--muted);
  font-weight: 600;
  letter-spacing: .4px;
  font-size: clamp(13px, 1.6vw, 15px);
  opacity:.9;
}

/* If you later use an SVG/PNG logo */
.brand__logo{
  height:48px; width:auto;
  filter: drop-shadow(0 8px 26px rgba(59,130,246,.25));
}

/* Slightly larger padding when full width */
.brandbar--full{
  padding-block: 28px;
}
/* ===== Big brand masthead ===== */
.masthead{
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: saturate(120%) blur(6px);
  background:
    radial-gradient(900px 500px at 10% -20%, rgba(16,26,51,.75) 0%, transparent 60%),
    radial-gradient(900px 500px at 120% 0%, rgba(12,24,49,.65) 0%, transparent 55%),
    var(--bg);
  border-bottom: 1px solid var(--border);
}
.masthead__inner{
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 16px 32px;             /* ↑ make taller */
  display: flex;
  align-items: center;
  justify-content: center;             /* ← center it */
}
.masthead__brand{
  margin: 0;
  font-weight: 900;
  letter-spacing: .6px;
  line-height: 1.02;
  text-align: center;
  font-size: clamp(56px, 8vw, 96px);   /* ← bigger cap (96px) */
  background: linear-gradient(90deg,#93c5fd 0%,#60a5fa 30%,#a78bfa 70%,#c4b5fd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 10px 45px rgba(96,165,250,.35);
  user-select: none;
}
.masthead__dot{
  color:#60a5fa;
  margin: 0 .35ch;
  filter: drop-shadow(0 0 14px rgba(96,165,250,.5));
}
/* Center the entire app block on the page */
.page-shell{
  width: 100%;
  display: flex;
  justify-content: center;   /* <-- centers the grid */
}

/* (safety) make sure the page has no stray margins/padding */
html, body { margin: 0; padding: 0; }
/* A single centered page container used everywhere */
.container{
  width: min(1200px, 100% - 64px);  /* max width, with side gutters */
  margin-inline: auto;              /* centers the whole block */
}

/* Center the brand text inside the masthead */
.masthead__inner{
  /* replace previous width/margins if you had them */
  width: min(1200px, 100% - 64px);
  margin-inline: auto;
  padding: 48px 0 28px;
  display: flex;
  justify-content: center;          /* brand centered */
  align-items: center;
}
`;
