const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// Get all users
router.get('/', async (req, res) => {
    const users = await sequelize.models.users.findAndCountAll();
    return res.status(200).json({ data: users });
});

//Update a user by id
router.put('/:id', async (req, res) => {
  const { body, params: { id } } = req;
  const user = await sequelize.models.users.findByPk(id);
  if(!user) {
    return res.status(404).json({ code: 404, message: 'User Not Found !'});
  }
  const updatedUser = await user.update({
    name: body.name,
    lastname: body.lastname,
    type: body.type || 'client',
    email: body.email,
  });
  return res.json({ data: updatedUser });
});

//Delete a user by ID
router.delete('/:id', async(req, res) => {
  const { params: { id } } = req;
  const user = await sequelize.models.users.findByPk(id);
  if(!user) {
    return res.status(404).json({ code: 404, message: 'User Not Found !'});
  }
  await user.destroy();
  return res.json({ message: 'User deleted successfully !'});
});

module.exports = router;