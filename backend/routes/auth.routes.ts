// const express = require("express");
// const router = express.Router();
// const { verifyToken } = require("../middleware/auth.middleware");


// const authController = require("../src/components/Auth/auth.controllers");

// router.post("/login", authController.login);
// router.post("/refresh-token", authController.refreshToken);
// //router.post("/logout", authController.logout);
// router.get("/current-user", verifyToken, authController.getCurrentUser); 
// router.post("/logout", verifyToken, authController.logout);
// module.exports = router;



import express from "express";
const router = express.Router();

import {verifyToken} from "../middleware/auth.middleware"
import * as authController from "../src/components/Auth/auth.controllers"

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.get("/current-user",verifyToken, authController.getCurrentUser);
router.post("/logout", verifyToken, authController.logout);

export default router;
