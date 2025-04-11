import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import apiRoutes from "./routes/api/index.js"; // Import the combined API routes
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables
dotenv.config();
// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Connect to the database
// Removed connectDB() call as it is not callable
// Use the combined API routes
app.use("/api", apiRoutes);
// Individual route handlers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
// Test database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();
// Synchronize the database
(async () => {
    try {
        await sequelize.sync({ force: false }); // Set `force: true` to recreate the table
        console.log("Database synchronized successfully.");
    }
    catch (error) {
        console.error("Error synchronizing the database:", error);
    }
})();
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
