import { seedUsers } from "./users.seeder";
import { seedPermissions } from "./permissions.seeder";

const seedDB = async () => {
  await seedUsers();
  await seedPermissions();
};

seedDB().then(() => {
  console.log("> Successfully seeded database");
  process.exit();
});
