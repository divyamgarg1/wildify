// // const { Sequelize } = require("sequelize");

// // const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
// //     host: process.env.DB_HOST,
// //     dialect: "mysql",
// //     port: process.env.DB_PORT || 3306,
// //     logging: false,
// //     dialectOptions: {
// //         connectTimeout: 60000
// //     }
// // });

// // module.exports = sequelize;


// const { Sequelize } = require("sequelize");

// // Optional debugging logs (remove after testing)
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PORT:", process.env.DB_PORT);

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     port: process.env.DB_PORT || 3306,  // Default to 3306 if not specified
//     logging: false,  // Disable Sequelize logging (set to console.log for debugging if needed)
//     dialectOptions: {
//         connectTimeout: 60000  // 60 seconds timeout to handle slow connections
//     }
// });

// // Test the connection (optional, remove after testing)
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("Database connection established successfully.");
//     })
//     .catch((err) => {
//         console.error("Database connection failed:", err);
//     });

// module.exports = sequelize;
// backend/config/db.js

// backend/config/db.js
// backend/config/db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: console.log,
  }
);

module.exports = sequelize;