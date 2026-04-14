// const mongoose = require("mongoose");

// const trackerSchema = new mongoose.Schema(
//   {
//     city: { type: String, required: true },
//     company: { type: String, required: true },
//     model: { type: String, required: true },
//     sales: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Tracker", trackerSchema);




import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITracker extends Document {
  city: string;
  company: string;
  productModel: string;
  sales: number;
  createdAt: Date;
  updatedAt: Date;
}

const trackerSchema: Schema = new Schema(
  {
    city: { type: String, required: true },
    company: { type: String, required: true },
    productModel: { type: String, required: true },
    sales: { type: Number, required: true },
  },
  { timestamps: true }
);

const Tracker: Model<ITracker> = mongoose.model<ITracker>(
  "Tracker",
  trackerSchema
);

export default Tracker;