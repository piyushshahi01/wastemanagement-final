const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password, passkey } = req.body;

    let role = "user";

    if (passkey === process.env.ADMIN_PASSKEY) {
        role = "admin";
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed, role });
    await user.save();

    res.json({ message: "User registered" });
};

exports.login = async (req, res) => {
    const { email, password, passkey } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    // Admin check
    if (user.role === "admin" && passkey !== process.env.ADMIN_PASSKEY) {
        return res.status(403).json({ msg: "Admin passkey required" });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({ token, role: user.role });
};
