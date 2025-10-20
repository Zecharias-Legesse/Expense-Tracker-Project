const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ["income", "expense"], required: true },
    note: { type: String, default: "" },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = model("Transaction", transactionSchema);
