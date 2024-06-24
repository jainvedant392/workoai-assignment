require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
require("colors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/api/workoai', userRoutes);
app.use('/api/auth', authRoutes);

db.connectDB();

app.get("/", (req, resp) => {
  resp.status(200).json({ message: "Welcome to the API" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}, http://localhost:${PORT}`.yellow.bold
  );
});

module.exports = app;