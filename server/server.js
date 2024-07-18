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
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
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
        })
    } catch (error) {
        console.log("Something went wrong", error);
    }
})
