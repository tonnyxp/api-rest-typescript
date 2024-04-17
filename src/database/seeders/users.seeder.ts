import bcrypt from "bcryptjs";
import RoleModel from "../../models/roles.model";
import UserModel from "../../models/users.model";

enum ROLE_TYPES {
  ADMINISTRATOR = "admin",
  USER = "user",
}

const roles = [{ name: ROLE_TYPES.ADMINISTRATOR }, { name: ROLE_TYPES.USER }];

const findRoleId = async (name: string) => {
  const data = await RoleModel.findOne({ where: { name } });
  if (!data) {
    throw new Error(`Role ${name} not found`);
  }

  return data.roleId;
};

const users = async () => [
  {
    name: "Administrator",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 8),
    verified: true,
    roleId: await findRoleId(ROLE_TYPES.ADMINISTRATOR),
  },
  {
    name: "Demo",
    email: "demo@example.com",
    password: bcrypt.hashSync("temporal", 8),
    roleId: await findRoleId(ROLE_TYPES.USER),
  },
];

export const seedUsers = async () => {
  console.log("Seeding users");
  await RoleModel.bulkCreate(roles);
  await UserModel.bulkCreate(await users());
};
