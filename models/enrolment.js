const {DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => sequelize.define('enrolments', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  courseId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'courses',
      key: 'id',
    },
    OnDelete: 'CASCADE',
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    OnDelete: 'CASCADE',
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});