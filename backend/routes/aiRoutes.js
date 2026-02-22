const express = require("express");
const router = express.Router();

// dummy AI (you can upgrade later)
router.post("/detect", (req, res) => {
    const { image } = req.body;

    // fake detection
    const types = ["plastic", "food", "paper"];
    const random = types[Math.floor(Math.random() * types.length)];

    res.json({
        type: random,
        suggestion:
            random === "plastic"
                ? "Recycle it"
                : random === "food"
                    ? "Compost it"
                    : "Reuse or recycle"
    });
});

module.exports = router;
