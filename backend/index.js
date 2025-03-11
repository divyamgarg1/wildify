// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const sequelize = require("./config/db");
// const authRoutes = require("./routes/auth");
// const fileRoutes = require("./routes/protected");

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:3000", // Match your frontend URL
//   methods: ["GET", "POST"],
//   credentials: true,
// }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/files", fileRoutes);

// // Root endpoint
// app.get("/", (req, res) => {
//   res.send("Welcome to Wildlife Research Platform API");
// });

// // Log environment variables for debugging
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PORT:", process.env.DB_PORT);

// // Test database connection before starting the server
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connection established successfully.");
//   })
//   .catch((err) => {
//     console.error("Database connection failed:", err);
//   });

// // Connect to database & start server
// const PORT = process.env.PORT || 5000;
// sequelize
//   .sync()
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.log("DB Connection Error: ", err));

// backend/index.js


// backend/index.js
// backend/index.js

// backend/index.js
// backend/index.js
// backend/index.js
// backend/index.js
// backend/index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const User = require("./models/User");
const File = require("./models/File");

const app = express();

// Create uploads directory if it doesn’t exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Created uploads directory");
}

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

// Seed initial users only if they don’t exist
const seedInitialUsers = async () => {
  const adminExists = await User.findOne({ where: { email: "admin@example.com" } });
  const researcherExists = await User.findOne({ where: { email: "divyamgar12@gmail.com" } });

  if (!adminExists) {
    await User.create({
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });
    console.log("Admin user seeded");
  }

  if (!researcherExists) {
    await User.create({
      id: "e3088151-a2e3-4251-b9f8-3f557751c959",
      email: "divyamgar12@gmail.com",
      password: "researcher123",
      role: "researcher",
    });
    console.log("Researcher user seeded");
  }

  if (adminExists && researcherExists) {
    console.log("Initial users already exist, skipping seeding");
  }
};

// Database sync and server start
const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false }).then(async () => {
  console.log("Database synced successfully");
  await seedInitialUsers(); // Seed users if they don’t exist
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error("Failed to sync database:", error);
});