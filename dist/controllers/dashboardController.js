import Income from "../models/income.js";
import Expense from "../models/expense.js";
// Get Dashboard Data
export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        // Fetch total income
        const totalIncome = await Income.sum("amount", { where: { userId } });
        // Fetch total expenses
        const totalExpense = await Expense.sum("amount", { where: { userId } });
        // Fetch recent income transactions (last 60 days)
        const last60DaysIncomeTransactions = await Income.findAll({
            where: {
                userId,
                date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
            },
            order: [["date", "DESC"]],
        });
        // Fetch recent expense transactions (last 30 days)
        const last30DaysExpenseTransactions = await Expense.findAll({
            where: {
                userId,
                date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
            },
            order: [["date", "DESC"]],
        });
        res.status(200).json({
            totalIncome,
            totalExpense,
            last60DaysIncomeTransactions,
            last30DaysExpenseTransactions,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
