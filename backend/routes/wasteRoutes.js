const express = require("express");
const router = express.Router();
const Waste = require("../models/Waste");
const auth = require("../middleware/auth");

const User = require("../models/User");

// Waste Point Multipliers per kg
const POINT_MULTIPLIERS = {
    metal: 15,
    plastic: 10,
    glass: 8,
    paper: 5,
    organic: 2,
};

// add waste
router.post("/", auth, async (req, res) => {
    try {
        const { type, quantity } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ error: "User not found" });

        // Calculate dynamic eco-points
        let multiplier = POINT_MULTIPLIERS[type.toLowerCase()] || 0;

        // --- Streak Calculation Game Loop --- //
        const now = new Date();
        const lastLog = user.lastLogDate ? new Date(user.lastLogDate) : null;
        let newStreak = user.currentStreak || 0;
        let isStreakBonus = false;

        if (lastLog) {
            // Normalize dates to midnight for day comparison
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const lastLogDay = new Date(lastLog.getFullYear(), lastLog.getMonth(), lastLog.getDate());

            const diffTime = Math.abs(today - lastLogDay);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Logged yesterday, streak continues!
                newStreak += 1;
            } else if (diffDays === 0) {
                // Already logged today, streak stays the same, no penalty
            } else {
                // Missed a day or more, streak resets
                newStreak = 1;
            }
        } else {
            newStreak = 1; // First log ever
        }

        // Apply a massive 1.5x multiplier if they are on a 3+ day streak
        if (newStreak >= 3) {
            multiplier = multiplier * 1.5;
            isStreakBonus = true;
        }

        const earnedPoints = Math.round(multiplier * quantity);

        // Save waste log with points
        const waste = new Waste({
            ...req.body,
            userId: req.user.id,
            points: earnedPoints
        });
        await waste.save();

        // Update User's total eco points, streak, and last log date
        user.ecoPoints += earnedPoints;
        user.currentStreak = newStreak;
        user.lastLogDate = now;
        await user.save();

        res.json({
            waste,
            streak: newStreak,
            isStreakBonus,
            earnedPoints
        });
    } catch (error) {
        console.error("Error logging waste:", error);
        res.status(500).json({ error: "Failed to log waste" });
    }
});

// get user waste
router.get("/", auth, async (req, res) => {
    const data = await Waste.find({ userId: req.user.id });
    res.json(data);
});

module.exports = router;
