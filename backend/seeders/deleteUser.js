const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const User = require("../models/User");

const deleteUserByEmail = async (email) => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`User with email ${email} not found.`);
      return;
    }

    await user.destroy();
    console.log(`User with email ${email} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting user:", error);
  } finally {
    await sequelize.close();
  }
};

// Delete the user with email 'div@gmail.com'
deleteUserByEmail("divyagar123@gmail.com");