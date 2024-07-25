const User = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerate = require("otp-generator");
require("dotenv").config();

//* verify user
async function verifyUser(req, res, next) {
  const { username } = req.method == "GET" ? req.query : req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  next();
}

//* Register Route
async function register(req, res) {
  try {
    const { username, email, password, profile } = req.body;

    // Check if user email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Check if username already exists
    const userName = await User.findOne({ username });
    if (userName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Create new user
    const newUser = new User({
      username : req.body.username,
      email,
      password: hashedPassword,
      profile: profile || "",
    });
    const userData = await newUser.save();
    return res
      .status(201)
      .json({ message: "User registerd successfully", userData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error : error.message });
  }
}

//* Login Route
async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.password = undefined;

    // Send response
    return res
      .status(200)
      .json({ message: "Login successful", username, token });
  } catch (error) {
    return res.status(500).json(error);
  }
}

//* Register Mail Route
async function registerMail(req, res) {}

//* authenticate Route
async function authenticate(req, res) {
  res.status(200).json("authenticate");
}

//* getUser Route
async function getUser(req, res) {
  const { username } = req.params;
  const user = await User.findOne({ username }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(201).json(user);
}

//* update user Route
async function updateUser(req, res) {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body).select(
      "-password"
    );
    return res
      .status(201)
      .json({ msg: "User profile updated successfully", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

//* Generate OTP Route
async function generateOTP(req, res) {
  req.app.locals.OTP = otpGenerate.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).json({ otp: req.app.locals.OTP });
}

//* Verify OTP Route
async function verifyOTP(req, res) {
  const { otp } = req.query;
  if (parseInt(otp) == parseInt(req.app.locals.OTP)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).json({ message: "OTP verified" });
  }
  return res.status(400).json({ message: "Invalid OTP" });
}

//* create reset session
async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    
    return res.status(201).json({flag : req.app.locals.resetSession });
  }
  return res.status(400).json({ error: "session expired" });
}

//* reset password
async function updatePassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(400).json({ error: "Session expired" });
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      req.app.locals.resetSession = false;
      return res.status(201).json({ message: "Password updated successfully" });
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(401).json(error);
  }
}

module.exports = {
  verifyUser,
  register,
  registerMail,
  authenticate,
  login,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  updatePassword,
};
