import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.cookie("session_token", token, {
      httpOnly: true, // Prevents access from JavaScript
      secure: true, // Use only in HTTPS
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please must be at least 8 characters",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.cookie("session_token", token, {
      httpOnly: true, // Prevents access from JavaScript
      secure: true, // Use only in HTTPS
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Check Authentication Route
const getProfile = async (req, res) => {
  const { userId } = req.body;
  try {
    if (userId) {
      const user = await userModel.findOne({ _id: userId });
      return res.json({
        success: true,
        user: { _id: user._id, email: user.email, name: user.name },
      });
    }
    res.json({ success: false, message: "Not authenticated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const logOut = async (req, res) => {
  res.clearCookie("session_token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ success: true, message: "Logged out" });
};

export { loginUser, registerUser, getProfile, logOut };
