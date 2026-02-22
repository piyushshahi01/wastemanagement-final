const express = require("express");
const router = express.Router();
const Center = require("../models/Center");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// add center (admin only)
router.post("/", auth, admin, async (req, res) => {
    const center = new Center(req.body);
    await center.save();
    res.json(center);
});

// get centers
router.get("/", async (req, res) => {
    const centers = await Center.find();
    res.json(centers);
});

module.exports = router;
