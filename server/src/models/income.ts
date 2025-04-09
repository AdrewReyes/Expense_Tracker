import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.js"; // Import your Sequelize instance

interface IncomeAttributes {
  id: number;
  userId: number;
  icon?: string;
  source: string;
  amount: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type IncomeCreationAttributes = Optional<IncomeAttributes, "id" | "date">;

class Income extends Model<IncomeAttributes, IncomeCreationAttributes> implements IncomeAttributes {
  public id!: number;
  public userId!: number;
  public icon?: string;
  public source!: string;
  public amount!: number;
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Income.init(
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
  },
  {
    sequelize,
    modelName: "Income",
    tableName: "incomes",
    timestamps: true,
  }
);

export default Income;