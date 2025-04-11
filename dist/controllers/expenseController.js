import Expense from "../models/expense.js";
import xlsx from "xlsx";
// Add Expense
export const addExpense = async (req, res) => {
    const userId = req.user?.id;
    try {
        const { icon, category, amount, date } = req.body;
        // Validation
        if (!category || typeof category !== "string") {
            return res.status(400).json({ message: "Invalid category" });
        }
        if (!amount || typeof amount !== "number") {
            return res.status(400).json({ message: "Invalid amount" });
        }
        if (!date || isNaN(new Date(date).getTime())) {
            return res.status(400).json({ message: "Invalid date" });
        }
        const newExpense = await Expense.create({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });
        return res.status(200).json(newExpense);
    }
    catch (error) {
        console.error("Error in addExpense:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return res.status(500).json({ message: "Server Error", error: errorMessage });
    }
};
// Get All Expenses
export const getAllExpenses = async (req, res) => {
    const userId = req.user?.id;
    try {
        const expenses = await Expense.findAll({
            where: { userId },
            order: [["date", "DESC"]],
        });
        return res.json(expenses);
    }
    catch (error) {
        console.error("Error in getAllExpenses:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return res.status(500).json({ message: "Server Error", error: errorMessage });
    }
};
// Download Expense Excel
export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user?.id;
    try {
        const expenses = await Expense.findAll({ where: { userId } });
        if (expenses.length === 0) {
            return res.status(404).json({ message: "No expenses found" });
        }
        const data = expenses.map((record) => ({
            Category: record.category,
            Amount: record.amount,
            Date: record.date.toISOString(),
        }));
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Expenses");
        const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
        res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
        return; // Ensure all code paths return a value
    }
    catch (error) {
        console.error("Error in downloadExpenseExcel:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return res.status(500).json({ message: "Server Error", error: errorMessage });
    }
};
// Delete Expense
export const deleteExpense = async (req, res) => {
    const userId = req.user?.id;
    const expenseId = req.params.id;
    try {
        // Find the expense by ID and user ID
        const expense = await Expense.findOne({ where: { id: expenseId, userId } });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        // Delete the expense
        await expense.destroy();
        return res.status(200).json({ message: "Expense deleted successfully" });
    }
    catch (error) {
        console.error("Error in deleteExpense:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return res.status(500).json({ message: "Server Error", error: errorMessage });
    }
};
