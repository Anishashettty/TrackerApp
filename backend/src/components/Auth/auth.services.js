const User = require("../User/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET = "mysecret123";
const REFRESH_SECRET = "refreshsecret123";

exports.loginUser = async (email, password) => {
  // ===== user  and admin (both same now ) based on role it works =====
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid password");

  const payload = {
    userId: user._id,
    role: user.role,
  };
  // Access Token (short lived)
  const accessToken = jwt.sign(payload, SECRET, { expiresIn: "15m" });

  //refresh token (long lived)
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    ...payload,
  };
};
