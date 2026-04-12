const jwt = require("jsonwebtoken");

const SECRET = "mysecret123";

exports.verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, SECRET);
	console.log("Decoded token:", decoded);
    req.user = decoded; 
	

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};