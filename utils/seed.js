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
      const thoughtsWithUsers = thoughts.map((thought, i) => {
        const user = users[Math.floor(Math.random() * users.length)];
        return {
          ...thought,
          userId: user._id,
          username: user.username,
        };
      });

      // Create new thoughts
      const createdThoughts = await Thought.insertMany(thoughtsWithUsers);

      // Update users' thoughts array with associated thoughts
      for (const thought of createdThoughts) {
        await User.findByIdAndUpdate(
          thought.userId,
          { $push: { thoughts: thought._id } },
          { new: true, runValidators: true }
        );
      }
      // Close the connection to the MongoDB server
      await connection.close();

      console.log("Database seeded successfully! 🌱");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  }

  // Call the seedDatabase function
  seedDatabase();
});
