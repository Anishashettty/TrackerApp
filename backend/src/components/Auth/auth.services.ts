// const User = require("../User/user");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const SECRET = "mysecret123";
// const REFRESH_SECRET = "refreshsecret123";

// exports.loginUser = async (email, password) => {
//   // ===== user  and admin (both same now ) based on role it works =====
//   const user = await User.findOne({ email });

//   if (!user) throw new Error("User not found");

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) throw new Error("Invalid password");

//   const payload = {
//     userId: user._id,
//     role: user.role,
//   };
//   // Access Token (short lived)
//   const accessToken = jwt.sign(payload, SECRET, { expiresIn: "15m" });

//   //refresh token (long lived)
//   const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

//   user.refreshToken = refreshToken;
//   await user.save();

//   return {
//     accessToken,
//     refreshToken,
//     ...payload,
//   };
// };


import User from "../User/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//Env variables
const SECRET = "mysecret123";
const REFRESH_SECRET = "refreshsecret123";

//PAYLOAD 
interface JwtPayload {
  userId: string;
  role: string;
}

//return type 
interface LoginResponse extends JwtPayload {
  accessToken: string;
  refreshToken: string;
}

//Login function
export const loginUser = async (
  email: string,
   password: string
  ): Promise<LoginResponse> => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid password");

  const payload: JwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = jwt.sign(payload, SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    ...payload,
  };
}