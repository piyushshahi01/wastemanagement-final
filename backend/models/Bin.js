const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
    level: Number,
    gas: Number,
    temperature: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bin", binSchema);
