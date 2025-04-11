import express from "express";
import { registerUser, loginUser, getUserInfo, } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();
// Register a new user
router.post("/register", registerUser);
// Login a user
router.post("/login", loginUser);
// Get user information (protected route)
router.get("/getUser", protect, getUserInfo);
// Upload an image
router.post("/upload-image", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        return res.status(200).json({ imageUrl });
    }
    catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({ message: "Server error during file upload" });
    }
});
export default router;
