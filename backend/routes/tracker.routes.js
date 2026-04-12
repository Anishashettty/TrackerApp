
const express = require("express");
const router = express.Router();

const trackerController = require("../src/components/Tracker/tracker.controllers");

const { verifyToken } = require("../middleware/auth.middleware");

router.post("/", verifyToken, trackerController.createTracker);
router.get("/", verifyToken, trackerController.getTracker);
router.put("/:id", verifyToken, trackerController.updateTracker);
router.delete("/:id", verifyToken, trackerController.deleteTracker);

module.exports = router;