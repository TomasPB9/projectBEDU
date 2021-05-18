const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

//get all enrolments
router.get('/', permission('admin', 'client'), async (req, res) => {
  const enrolments = await sequelize.models.enrolments.findAndCountAll();
  return res.status(200).json({ data: enrolments });
});

//create a new enrolment
router.post('/', permission('admin', 'client'), async (req, res) => {
  const { body } = req;
  const enrolment = await sequelize.models.enrolments.create({
    courseId: body.courseId,
    userId: body.userId
  });
  await enrolment.save();
  return res.status(201).json({ data: enrolment });
});

//update a enrolment by id
router.put('/:id', permission('admin', 'client'), async (req, res) => {
  const { body, params: { id } } = req;
  const enrolment = await sequelize.models.enrolments.findByPk(id);
  if(!enrolment) {
    return res.status(404).json({ code: 404, message: 'Enrolment Not found !'});
  }
  const updateEnrolment = await enrolment.update({
    courseId: body.courseId,
    userId: body.userId
  });
  return res.json({ data: updateEnrolment });
});

//delete a enrolment by id
router.delete('/:id', permission('admin', 'client'), async (req, res) => {
  const { params: { id } } = req;
  const enrolment = await sequelize.models.enrolments.findByPk(id);
  if(!enrolment) {
    return res.status(404).json({ code: 404, message: 'Enrolment not Found !'});
  }
  await enrolment.destroy();
  return res.json({ message: 'Enrolment deleted successfully !'});
});

module.exports = router;