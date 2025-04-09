import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js"; // Sequelize User model

// Generate JWT token
const generateToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
};

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    res.status(201).json({
      id: user.id,
      user,
      token: generateToken(user.id),
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message: "Server Error", error: errorMessage });
    return;
  }
  return; // Ensure all code paths return a value
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      id: user.id,
      user,
      token: generateToken(user.id),
    });
    return;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message: "Server Error", error: errorMessage });
  }
  return; // Ensure all code paths return a value
};

// Get User Info
export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = req.user; // Populated by authMiddleware
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ 
      message: "Server Error", 
      error: err instanceof Error ? err.message : "Unknown error" 
    });
  }
};