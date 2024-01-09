import { seedUsers } from "./users.seeder";

const seedDB = async () => {
  await seedUsers();
};

seedDB().then(() => {
  console.log("> Successfully seeded database");
  process.exit();
});
