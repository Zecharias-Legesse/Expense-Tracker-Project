const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();               // << loads .env
const connectDB = require("./config/db"); // << db connect (safe if missing MONGO_URI)

const app = express();

// middleware
app.use(cors({ origin: process.env.CORS_ORIGIN}));
app.use(express.json());
app.use(morgan("dev"));

// connect DB (won't crash if MONGO_URI not set)
connectDB();

// health check
app.get("/", (_req, res) => res.send("API is running"));

// routes
app.use("/api/transactions", require("./routes/transactionRoutes"));

// basic error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

