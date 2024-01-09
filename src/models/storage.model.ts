import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/mysql";

class Storage extends Model {
  public uuid!: string;
  public filename!: string;
  public url!: string;
}

Storage.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "storage",
    timestamps: true,
  }
);

export default Storage;
