const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { usernames, emails, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Function to seed the database
  async function seedDatabase() {
    try {
      // Delete existing data
      await User.deleteMany({});
      await Thought.deleteMany({});

      // Create new users
      const users = await User.insertMany(
        usernames.map((username, i) => ({ username, email: emails[i] }))
      );

      // Associate thoughts with users
      const thoughtsWithUsers = thoughts.map((thought, i) => ({
        ...thought,
        username: users[Math.floor(Math.random() * users.length)].username,
      }));

      // Create new thoughts
      await Thought.insertMany(thoughtsWithUsers);

      console.log("Database seeded successfully! 🌱");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  }

  // Call the seedDatabase function
  seedDatabase();
});
