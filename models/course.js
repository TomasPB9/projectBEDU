const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('courses', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  credits: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
  image: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});