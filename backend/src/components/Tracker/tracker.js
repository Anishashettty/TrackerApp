const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    company: { type: String, required: true },
    model: { type: String, required: true },
    sales: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tracker", trackerSchema);
