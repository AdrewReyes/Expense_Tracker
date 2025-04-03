// filepath: server/src/routes/expenseRoutes.js
const express = require('express');
const { getExpenses, addExpense } = require('../controllers/expenseController');
const router = express.Router();

router.get('/', getExpenses); // Retrieve all expenses
router.post('/add', addExpense); // Add a new expense

module.exports = router;