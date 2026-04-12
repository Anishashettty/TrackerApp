const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");


const authController = require("../src/components/Auth/auth.controllers");

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
//router.post("/logout", authController.logout);
router.get("/current-user", verifyToken, authController.getCurrentUser); 
router.post("/logout", verifyToken, authController.logout);
module.exports = router;