import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    return res.status(200).json({ imageUrl });
});
export default router;
