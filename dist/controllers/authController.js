import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js"; // Sequelize User model
// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
};
// Register User
export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;
    if (!fullName || !email || !password) {
        console.log("Missing required fields:", { fullName, email, password });
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        console.log("Checking if email already exists:", email);
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log("Email already in use:", email);
            return res.status(400).json({ message: "Email already in use" });
        }
        console.log("Creating user...");
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });
        console.log("User created successfully:", user);
        res.status(201).json({
            id: user.id,
            user,
            token: generateToken(user.id),
        });
    }
    catch (err) {
        console.error("Error during user registration:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ message: "Server Error", error: errorMessage });
        return;
    }
    return; // Ensure all code paths return a value
};
// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json({
            id: user.id,
            user,
            token: generateToken(user.id),
        });
        return;
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ message: "Server Error", error: errorMessage });
    }
    return; // Ensure all code paths return a value
};
// Get User Info
export const getUserInfo = async (req, res) => {
    try {
        const user = req.user; // Populated by authMiddleware
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
};
