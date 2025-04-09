import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.js"; // Import your Sequelize instance

interface ExpenseAttributes {
  id: number;
  userId: number;
  icon?: string;
  category: string;
  amount: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type ExpenseCreationAttributes = Optional<ExpenseAttributes, "id" | "date">;

class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> implements ExpenseAttributes {
  public id!: number;
  public userId!: number;
  public icon?: string;
  public category!: string;
  public amount!: number;
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Expense.init(
  {
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
  },
  {
    sequelize,
    modelName: "Expense",
    tableName: "expenses",
    timestamps: true,
  }
);

export default Expense;