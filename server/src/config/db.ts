import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Create a Sequelize instance based on environment variables
const sequelize = process.env.DATABASE_URL
  ? // Use DATABASE_URL if available (e.g., for production)
    new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: console.log, // Enable logging for debugging; set to false to disable
    })
  : // Otherwise, use individual environment variables (e.g., for local development)
    new Sequelize(
      process.env.DB_NAME as string,
      process.env.DB_USER as string,
      process.env.DB_PASSWORD as string,
      {
        host: process.env.DB_HOST as string,
        port: parseInt(process.env.DB_PORT as string, 10),
        dialect: "postgres",
        logging: console.log, // Enable logging for debugging; set to false to disable
      }
    );

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;