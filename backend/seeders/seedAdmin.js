const { Sequelize } = require("sequelize");
const sequelize = require("../config/db"); // Path to Sequelize config
const User = require("../models/User"); // Path to User model

const seedAdminUser = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ alter: true }); // Sync database (use with caution in production)

    const existingAdmin = await User.findOne({ where: { email: "admin@gmail.com" } });
    if (!existingAdmin) {
      await User.create({
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin123", // Plain text since you removed bcrypt
        role: "admin",
      });
      console.log("Admin user created successfully: admin@gmail.com / admin123");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  } finally {
    await sequelize.close();
  }
};

seedAdminUser();