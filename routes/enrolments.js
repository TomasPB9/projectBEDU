const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

// Get all enrolments
router.get('/', async (req, res) => {
  const enrolments = await sequelize.models.enrolments.findAndCountAll();
  return res.status(200).json({ data: enrolments });
});

//Create a new enrolment
router.post('/', permission('admin', 'client'), async(req, res) => {
  const { body } = req;
  const enrolment = await sequelize.models.enrolments.create({
    iduser: body.iduser,
    idcourse: body.idcourse,
  });
  await enrolment.save();
  return res.status(201).json({ data: enrolment });
});

//Update a enrolment by id
router.put('/:id', async(req, res) => {
  const { body, params: { id } } = req;
  const enrolment = await sequelize.models.enrolments.findByPk(id);
  if(!enrolment) {
    return res.status(404).json({ code: 404, message: 'Enrolment not found !'});
  }
  const updatedEnrolment = await enrolment.update({
    iduser: body.iduser,
    idcourse: body.idcourse,
  });
  return res.json({ data: updatedEnrolment});
});

//Delete a enrolment by id
router.delete('/:id', async(req, res) => {
  const { params: { id } } = req;
  const enrolment = await sequelize.models.enrolments.findByPk(id);
  if(!enrolment) {
    return res.status(404).json({ code: 404, message: 'Enrolment not found !'});
  }
  await enrolment.destroy();
  return res.json({ message: 'Enrolment deleted successfully !'});
});

module.exports = router;