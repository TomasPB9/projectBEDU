const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

//Get all courses
router.get('/', permission('admin', 'client'), async (req, res) => {
  const courses = await sequelize.models.courses.findAndCountAll();
  return res.status(200).json({ data: courses });
});

//create a new course
router.post('/', permission('admin', 'client'), async(req ,res) => {
  const { body } = req;
  const course = await sequelize.models.courses.create({
    description: body.description,
    credits: body.credits
  });
  await course.save();
  return res.status(201).json( {data: course });
});

//update a course by id
router.put('/:id', permission('admin', 'client'), async (req, res) => {
  const { body, params: { id } } = req;
  const course = await sequelize.models.courses.findByPk(id);
  if(!course) {
    return res.status(404).json({ code: 404, message: 'Course Not Found !'});
  }
  const updateCourse = await course.update({
    description: body.description,
    credits: body.credits
  });
  return res.json({ data: updateCourse});
});

//delete a course by id
router.delete('/:id', permission('admin', 'client'), async(req, res) => {
  const { params: { id } } = req;
  const course = await sequelize.models.courses.findByPk(id);
  if(!course) {
    return res.status(404).json({ code: 404, message: 'Course Not Found !'});
  }
  await course.destroy();
  return res.json( {message: 'Course deleted successfully !'});
});

module.exports = router;