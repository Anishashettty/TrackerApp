const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true },
    address: { type: String, required: true },
    permissions: {
      type: [String],
      default: ["tracker", "dashboard"],
    },
    cityOrder: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      enum: ["admin", "user","super-admin"],
      default : "user"
    },
    refreshToken: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
