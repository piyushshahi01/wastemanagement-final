const express = require("express");
const router = express.Router();
const Bin = require("../models/Bin");

// POST from NodeMCU
router.post("/", async (req, res) => {
    const data = new Bin(req.body);
    await data.save();
    res.json({ message: "Data saved" });
});

// GET latest data
router.get("/", async (req, res) => {
    const data = await Bin.find().sort({ createdAt: -1 }).limit(1);
    res.json(data[0]);
});

module.exports = router;
