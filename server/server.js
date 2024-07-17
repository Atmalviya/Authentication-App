const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./DB/conn");
dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.disable("x-powered-by");


const PORT = process.env.PORT || 5000;

// HTTP requests
app.get("/", (req, res) => {
    res.status(201).json("Hello World!");
});

connectDB().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log("Something went wrong", error);
    }
})
