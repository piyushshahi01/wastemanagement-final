const mongoose = require("mongoose");

const centerSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number,
    type: String
});

module.exports = mongoose.model("Center", centerSchema);
