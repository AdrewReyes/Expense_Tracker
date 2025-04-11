import Income from "../models/income.js";
import xlsx from "xlsx";
// Add Income
export const addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;
        // Validation
        if (!source || typeof source !== "string") {
            return res.status(400).json({ message: "Invalid source" });
        }
        if (!amount || typeof amount !== "number") {
            return res.status(400).json({ message: "Invalid amount" });
        }
        if (!date || isNaN(new Date(date).getTime())) {
            return res.status(400).json({ message: "Invalid date" });
        }
        const newIncome = await Income.create({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });
        return res.status(200).json(newIncome);
    }
    catch (error) {
        console.error("Error in addIncome:", error);
        return res.status(500).json({ message: "Server Error", error: 'No Connection' });
    }
};
// Get All Income
export const getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.findAll({
            where: { userId },
            order: [["date", "DESC"]],
        });
        return res.json(income);
    }
    catch (error) {
        console.error("Error in getAllIncome:", error);
        return res.status(500).json({ message: "Server Error", error: 'No Connection' });
    }
};
// Download Income Excel
export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.findAll({ where: { userId } });
        if (income.length === 0) {
            return res.status(404).json({ message: "No income records found" });
        }
        const data = income.map((record) => ({
            Source: record.source,
            Amount: record.amount,
            Date: record.date.toISOString(),
        }));
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Income");
        const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
        res.setHeader("Content-Disposition", "attachment; filename=income.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return res.send(buffer);
    }
    catch (error) {
        console.error("Error in downloadIncomeExcel:", error);
        return res.status(500).json({ message: "Server Error", error: 'No Connection' });
    }
};
// Delete Income
export const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        // Check if the income exists
        const income = await Income.findByPk(id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        // Delete the income
        await income.destroy();
        return res.status(200).json({ message: "Income deleted successfully" });
    }
    catch (error) {
        console.error("Error in deleteIncome:", error);
        return res.status(500).json({ message: "Server Error", error: 'No Connection' });
    }
};
