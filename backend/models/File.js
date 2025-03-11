// backend/models/File.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const File = sequelize.define("File", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
}, {
  timestamps: true,
});

module.exports = File;