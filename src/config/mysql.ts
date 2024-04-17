import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const host = process.env.MYSQL_HOST;
const database = process.env.MYSQL_DATABASE as string;
const username = process.env.MYSQL_USERNAME as string;
const password = process.env.MYSQL_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    // TODO: Remove alter: true in production
    await sequelize.sync();
    console.log("[database]: Successfully connected to database");
  } catch (e) {
    console.log("[database]: Error connecting to database: ", e);
  }
};

export { sequelize, connectDB };
