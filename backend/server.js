const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/waste", require("./routes/wasteRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/centers", require("./routes/centerRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
