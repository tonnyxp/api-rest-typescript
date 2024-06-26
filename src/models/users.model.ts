import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../config/mysql";
import RoleModel from "./roles.model";
import { Role } from "../interfaces/role.interface";

interface UserAttributes {
  uuid: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  roleId: number;
  status: number;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "uuid" | "verified" | "roleId" | "status"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define<UserInstance>(
  "User",
  {
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
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: RoleModel,
        key: "roleId",
      },
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

User.hasOne(RoleModel, {
  as: "role",
  sourceKey: "roleId",
  foreignKey: "roleId",
});

export default User;
