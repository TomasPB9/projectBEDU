const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db');

module.exports = (sequelize) => sequelize.define('enrolments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  iduser: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  idcourse: {
    type: Sequelize.INTEGER,
    references: {
      model: 'courses',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});