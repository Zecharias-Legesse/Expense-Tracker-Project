const Transaction = require("../models/Transaction");

exports.getAll = async (_req, res, next) => {
  try {
    const txns = await Transaction.find().sort({ createdAt: -1 });
    res.json(txns);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { amount, type, note, date } = req.body;
    if (amount == null || isNaN(amount)) {
      return res.status(400).json({ message: "amount required as a number" });
    }
    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "type must be income|expense" });
    }
    const txn = await Transaction.create({ amount, type, note, date });
    res.status(201).json(txn);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.sendStatus(204);
  } catch (err) { next(err); }
};
