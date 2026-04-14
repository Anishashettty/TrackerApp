// const jwt = require("jsonwebtoken");

// const SECRET = "mysecret123";

// exports.verifyToken = (req, res, next) => {
//   try {
//     const header = req.headers.authorization;

//     if (!header) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = header.split(" ")[1];

//     const decoded = jwt.verify(token, SECRET);
// 	console.log("Decoded token:", decoded);
//     req.user = decoded; 
	

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };



import jwt from "jsonwebtoken";
import {Request , Response, NextFunction} from "express";

const SECRET = "mysecret123";

//Extend Request type
interface AuthRequest extends Request {
  user?: any; // You can define a more specific type based on your user model
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
)=>{
  try{
    const header = req.headers.authorization;

    if(!header){
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  }catch(err: any){
    return res.status(401).json({ message: "Invalid token", error: err.message });
  }
}