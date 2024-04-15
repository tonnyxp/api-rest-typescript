import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/mysql";

interface UserAttributes {
  uuid: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  role: number;
  status: number;
}

interface UserCreationAttributes 
  extends Optional<UserAttributes, "uuid"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const User = sequelize.define<UserInstance>(
  "User", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    verified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
  }
);

export default User;
