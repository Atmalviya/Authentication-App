const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

//* Local imports
const connectDB = require("./DB/conn");
const router = require("./router/routes");

//* middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS, // Allows all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specifies allowed methods
  allowedHeaders: "Content-Type,Authorization", // Specifies allowed headers
  credentials: true,
  optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.options('*', cors()); // Handles preflight requests
app.use(express.json());
app.disable("x-powered-by");

const PORT = process.env.PORT || 5000;

// HTTP requests
app.get("/", (req, res) => {
  res.status(201).json("Hello World!");
});

//* Routes
app.use("/api", router);

connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
});
