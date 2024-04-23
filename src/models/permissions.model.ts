import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../config/mysql";

export interface PermissionAttributes {
  permissionId: number;
  name: string;
  slug: string;
  parent: number;
  order: number;
  enabled: boolean;
}

interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, "permissionId" | "enabled"> {}

interface PermissionInstance
  extends Model<PermissionAttributes, PermissionCreationAttributes>,
    PermissionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Permission = sequelize.define<PermissionInstance>(
  "Permission",
  {
    permissionId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING(150),
      unique: true,
    },
    parent: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    order: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    enabled: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "permissions",
    timestamps: true,
  }
);

export default Permission;
