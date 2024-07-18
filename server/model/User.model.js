const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Unique Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
  },
  firstName: String,
  lastName: String,
  contact: Number,
  address: String,
  profile : String
});

module.exports = mongoose.model("User", userSchema)