import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../config/mysql";

interface RoleAttributes {
  roleId: number;
  name: string;
  active: boolean;
}

interface RoleCreationAttributes
  extends Optional<RoleAttributes, "roleId" | "active"> {}

interface RoleInstance
  extends Model<RoleAttributes, RoleCreationAttributes>,
    RoleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Role = sequelize.define<RoleInstance>(
  "Role",
  {
    roleId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "roles",
    timestamps: true,
  }
);

export default Role;
