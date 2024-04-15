import bcrypt from "bcryptjs";
import User from "../../models/users.model";

const users = [
  {
    name: "Administrator",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 8),
  },
  {
    name: "Demo",
    email: "demo@example.com",
    password: bcrypt.hashSync("demo123", 8),
  },
];

export const seedUsers = async () => {
  console.log("Seeding users");
  await User.truncate();
  await User.bulkCreate(users);
};
