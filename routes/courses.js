const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

// Get all courses
router.get('/', permission('admin', 'client'), async (req, res) => {
  const courses = await sequelize.models.courses.findAndCountAll();
  return res.status(200).json({ data: courses });
});

// Create a new courses
router.post('/', async (req, res) => {
  const { body } = req;
  const course = await sequelize.models.courses.create({
    name: body.name,
    description: body.description,
    credits: body.credits,
    price: body.price,
    image: body.image,
  });
  await course.save();
  return res.status(201).json({ data: course })
});





module.exports = router;