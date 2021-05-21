const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

// Get all products
router.get('/', async (req, res) => {
  const courses = await sequelize.models.courses.findAndCountAll();
  return res.status(200).json({ data: courses });
});


module.exports = router;
