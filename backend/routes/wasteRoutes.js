const express = require("express");
const router = express.Router();
const Waste = require("../models/Waste");
const auth = require("../middleware/auth");

// add waste
router.post("/", auth, async (req, res) => {
    const waste = new Waste({ ...req.body, userId: req.user.id });
    await waste.save();
    res.json(waste);
});

// get user waste
router.get("/", auth, async (req, res) => {
    const data = await Waste.find({ userId: req.user.id });
    res.json(data);
});

module.exports = router;
