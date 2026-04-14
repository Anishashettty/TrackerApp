// const express = require("express");
// const cors = require("cors");

// require("dotenv").config();

// const connectDB = require("./config/db");
// connectDB();

// const app = express();


// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend URL
//     credentials: true, 
//   })
// )

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

// // import routes
// const userRoutes = require("./routes/user.routes");
// // use routes
// app.use("/api/users", userRoutes);


// const trackerRoutes = require("./routes/tracker.routes");
// app.use("/api/tracker", trackerRoutes);

// const authRoutes = require("./routes/auth.routes");
// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




//  ----------------typescript -----------------
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//import connectDB from "./config/db";

import connectDB from "./config/db";

//config 
dotenv.config();
connectDB();

const app = express();

//middleware
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, 
}));

app.use(cookieParser());

//routes  
import  userRoutes from "./routes/user.routes";
import  trackerRoutes from "./routes/tracker.routes";
import  authRoutes from "./routes/auth.routes";

app.use("/api/users", userRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

