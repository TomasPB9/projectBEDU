const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

//Get all teachers
router.get('/', permission('admin', 'client'), async (req, res) => {
  const teachers = await sequelize.models.teachers.findAndCountAll();
  return res.status(200).json({ data: teachers });
});

//create new teacher
router.post('/', permission('admin', 'client'), async (req, res) => {
  const { body } = req;
  const teacher = await sequelize.models.teachers.create({
    name: body.STRING,
    lastname: body.STRING,
    address: body.STRING,
    email: body.STRING,
    phone: body.INTEGER,
  });
  await teacher.save();
  return res.status(201).json({ data: teacher });
});

module.exports = router;