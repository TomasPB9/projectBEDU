const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

// Get all courses
router.get('/', async (req, res) => {
  const courses = await sequelize.models.courses.findAndCountAll();
  return res.status(200).json({ data: courses });
});

// Create a new courses
router.post('/', permission('admin'),  async (req, res) => {
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

//Update a course by id
router.put('/:id', async (req, res) => {
  const { body, params: { id } } = req;
  const course = await sequelize.models.courses.findByPk(id);
  if(!course) {
    return res.status(404).json({ code: 404, message: 'Course Not Found !'});
  }
  const updatedCourse = await course.update({
    name: body.name,
    description: body.description,
    credits: body.credits,
    price: body.price,
    image: body.image,
  });
  return res.json({ data: updatedCourse });
});

//Delete a course by ID
router.delete('/:id', permission('admin'), async(req, res) => {
  const { params: { id } } = req;
  const course = await sequelize.models.courses.findByPk(id);
  if(!course) {
    return res.status(404).json({ code: 404, message: 'Course Not Found !'});
  }
  await course.destroy();
  return res.json({ message: 'Course deleted successfully !'});
});







module.exports = router;