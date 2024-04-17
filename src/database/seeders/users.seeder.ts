import bcrypt from "bcryptjs";
import RoleModel from "../../models/roles.model";
import UserModel from "../../models/users.model";
import { ROLE_TYPES } from "./../../constants/roles";

enum ROLE {
  ADMINISTRATOR = "admin",
  USER = "user",
}

const roles = [{ name: ROLE.ADMINISTRATOR }, { name: ROLE.USER }];

const users = [
  {
    name: "Administrator",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 8),
    verified: true,
    roleId: ROLE_TYPES.ADMIN,
  },
  {
    name: "Demo",
    email: "demo@example.com",
    password: bcrypt.hashSync("temporal", 8),
    roleId: ROLE_TYPES.USER,
  },
];

export const seedUsers = async () => {
  console.log("Seeding users");
  await RoleModel.bulkCreate(roles);
  await UserModel.bulkCreate(users);
};
