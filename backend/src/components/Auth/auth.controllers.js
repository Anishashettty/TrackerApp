const User = require("../User/user");
const authService = require("./auth.services");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await authService.loginUser(email, password);

    res
    .cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      accessToken: data.accessToken,
      userId: data.userId,
      role: data.role,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const { userId, role } = req.user;

    // if (role === "admin" ) {
    //   return res.json({
    //     userId,
    //     role: "admin",
    //     name: "Admin",
    //     email: "admin@gmail.com",
    //     permissions: ["dashboard", "tracker", "users"],
    //   });
    // }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  //res.json(user)

    res.json({
      userId: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      permissions: user.permissions || []
    });
    console.log(user)

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



const jwt = require("jsonwebtoken");

const REFRESH_SECRET = "refreshsecret123";

exports.refreshToken = async(req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    // verify refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    const user =  await User.findById(decoded.userId);
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }


    const payload = {
      userId: decoded.userId,
      role: decoded.role,
    };

    // generate new access token
    const newAccessToken = jwt.sign(payload, "mysecret123", {
      expiresIn: "15m",
    });

    res.json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};


exports.logout = async (req, res) => {  
  try{
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
  }catch(err){
    res.status(500).json({ message: "Server error" });
  }
};