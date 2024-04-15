import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../config/mysql";

interface StorageAttributes {
  uuid: string;
  filename: string;
  url: string;
}

interface StorageCreationAttributes 
  extends Optional<StorageAttributes, "uuid"> {}

interface StorageInstance
  extends Model<StorageAttributes, StorageCreationAttributes>,
    StorageAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const Storage = sequelize.define<StorageInstance>(
  "Storage", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    filename: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "storage",
    timestamps: true,
  }
);

export default Storage;
