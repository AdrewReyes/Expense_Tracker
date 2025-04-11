import { Request, Response, NextFunction } from "express";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type of 'user' as needed
    }
  }
}
import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Sequelize User model

interface JwtPayload {
  id: number;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Extract token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    let decoded: JwtPayload | null = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
      console.log("Decoded Token:", decoded);
    } catch (err) {
      console.error("Token Verification Error:", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }

    // Find user by ID and attach to request object
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user; // Attach user to request object
    next();
    return; // Ensure all code paths return a value
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
    return; // Ensure all code paths return a value
  }
};