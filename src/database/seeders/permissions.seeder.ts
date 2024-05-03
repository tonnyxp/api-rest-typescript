import PermissionModel from "../../models/permissions.model";

const permissions = [
  {
    name: "Dashboard",
    slug: "dashboard",
    parent: 0,
    order: 0,
  },
  {
    name: "Roles",
    slug: "roles",
    parent: 0,
    order: 1,
  },
  {
    name: "Users",
    slug: "users",
    parent: 0,
    order: 2,
  },
  {
    name: "Permissions",
    slug: "permissions",
    parent: 0,
    order: 3,
  },
  {
    name: "Settings",
    slug: "settings",
    parent: 0,
    order: 4,
  },
];

export const seedPermissions = async () => {
  console.log("Seeding permissions");
  await PermissionModel.sync();
  await PermissionModel.bulkCreate(permissions);
};
