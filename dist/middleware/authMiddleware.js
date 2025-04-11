import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Sequelize User model
export const protect = async (req, res, next) => {
    let token;
    // Extract token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
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
    }
    catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
        return; // Ensure all code paths return a value
    }
};
