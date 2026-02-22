const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema({
    userId: String,
    type: String,
    quantity: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Waste", wasteSchema);
