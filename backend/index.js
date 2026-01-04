const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(
  cors({
    origin: "http://localhost:3001", // your React app URL
    credentials: true, // allow sending cookies
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

//ROUTES
app.use("/users", require("./routes/users"));
app.use("/books", require("./routes/books"));
app.use("/categories", require("./routes/categories"));
app.use("/admin", require("./routes/admin"));
app.use("/auth", require("./routes/auth"));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

//===ROUTES

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
