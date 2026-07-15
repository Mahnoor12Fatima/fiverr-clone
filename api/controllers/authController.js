import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      country,
      phone,
      img,
      role,
    } = req.body;

    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      country,
      phone,
      img,
      role,
      isSeller: role === "seller",
    });

    const savedUser = await newUser.save();

    const { password: _, ...userInfo } =
      savedUser._doc;

    res.status(201).json({
      message: "User registered successfully",
      user: userInfo,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isCorrect = await bcrypt.compare(
      password.trim(),
      user.password
    );

    if (!isCorrect) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    const { password: _, ...info } = user._doc;

    res.status(200).json({
      message: "Login successful",
      token,
      user: info,
    });
  } catch (err) {
  console.error("LOGIN ERROR:", err);

  res.status(500).json({
    message: "Login failed",
    error: err.message,
  });
}
};

// LOGOUT
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
    })
    .status(200)
    .json({
      message: "Logged out successfully",
    });
};
