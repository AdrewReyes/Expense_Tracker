import express from "express";
import authRoutes from "../authRoutes.js";
import dashboardRoutes from "../dashboardRoutes.js";
import expenseRoutes from "../expenseRoutes.js";
import incomeRoutes from "../incomeRoutes.js";

const router = express.Router();

// Combine all API routes
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/expenses", expenseRoutes);
router.use("/incomes", incomeRoutes);

export default router;