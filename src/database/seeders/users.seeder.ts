import bcrypt from "bcryptjs";
import User from "../../models/users.model";

const users = [
  {
    name: "Administrator",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin", 8),
    role: "admin",
  },
  {
    name: "Demo",
    email: "demo@example.com",
    password: bcrypt.hashSync("123456", 8),
    role: "user",
  },
];

export const seedUsers = async () => {
  console.log("Seeding users");
  await User.truncate();
  await User.bulkCreate(users);
};
