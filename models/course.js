const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('courses', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: DataTypes.TEXT,
  credits: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});