import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js"; // Import your Sequelize instance
class Income extends Model {
}
Income.init({
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
    source: {
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
    modelName: "Income",
    tableName: "incomes",
    timestamps: true,
});
export default Income;
