import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js"; // Import your Sequelize instance

interface UserAttributes {
  id: number;
  fullName: string;
  email: string;
  password: string;
  profileImageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "profileImageUrl">;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public profileImageUrl?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Compare passwords
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImageUrl: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

export default User;