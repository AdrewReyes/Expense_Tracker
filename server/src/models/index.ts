import User from "../models/user.js"; // Adjust the path to where User is defined
import Expense from "../models/expense.js"; // Adjust the path to where Expense is defined
import sequelize from "../config/db.js"; // Ensure this file exists and exports the Sequelize instance

(async () => {
  try {
    // Ensure the database connection is established
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Example: Create a new user
    const newUser = await User.create({
      fullName: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    console.log("New user created:", newUser);

    // Example: Create a new expense for the user
    const newExpense = await Expense.create({
      userId: newUser.id,
      category: "Food",
      amount: 50.0,
      date: new Date(),
    });

    console.log("New expense created:", newExpense);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
})();