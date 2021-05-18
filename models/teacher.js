const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('teachers', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: DataTypes.STRING,
  lastname: DataTypes.STRING,
  address: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})