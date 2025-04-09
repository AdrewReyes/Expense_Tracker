import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import {  urlencoded } from "body-parser";
import sequelize from "./config/db.js";
import apiRoutes from "./routes/api/index.js"; // Import the combined API routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use("/uploads", express.static("uploads"));

// Use the combined API routes
app.use("/api", apiRoutes);

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});