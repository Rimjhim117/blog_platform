// userSeed.js
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    const users = [];
    for (let i = 1; i <= 100; i++) {
      users.push({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: "123456" // we can hash later if needed
      });
    }

    await User.insertMany(users);
    console.log("🎉 100 fake users inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
