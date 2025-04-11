import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js"; // Import your Sequelize instance
class Expense extends Model {
}
Expense.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: "Expense",
    tableName: "expenses",
    timestamps: true,
});
export default Expense;
