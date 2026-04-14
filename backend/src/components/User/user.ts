// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     age: { type: Number, required: true },
//     email: { type: String, required: true, unique: true },
//     password: {type: String, required: true },
//     address: { type: String, required: true },
//     permissions: {
//       type: [String],
//       default: ["tracker", "dashboard"],
//     },
//     cityOrder: {
//       type: [String],
//       default: [],
//     },
//     role: {
//       type: String,
//       enum: ["admin", "user","super-admin"],
//       default : "user"
//     },
//     refreshToken: {
//       type: String,
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);



import mongoose, { Schema, Document, Model} from "mongoose";

export interface IUser extends Document {
  name: string,
  age: number,
  email: string,
  password: string,
  address: string,
  permissions?: string[],
  cityOrder?: string[],
  role: "admin" | "user" | "super-admin",
  refreshToken?: string | null,
  createdAt: Date,
  updatedAt: Date
}



const userSchema: Schema<IUser> = new Schema(
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

const user : Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default user;