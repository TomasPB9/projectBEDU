const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { body } = req;
    const user = await sequelize.models.users.findOne({ where: {
      email: body.email,
    }});

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    //body.password => es la contraseña que viene de afuera (que escribe el usuario)
    if (!user.validPassword(body.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token
    //secretkey debe coincidir con el mismo texto el authentication.js
    //jwt.sign({ userId: user.id } ahi podemos pasar parametros para descrbir el token
    const token = jwt.sign({ userId: user.id }, 'secretkey', {
      //token valido durante 10 horas
      expiresIn: "10h",
    });

    return res.json({
      message: 'Authenticated sucessfully',
      token,
    });
});

//registro de usuarios
router.post('/signup', async (req, res) => {
    const { body } = req;
    let user = await sequelize.models.users.findOne({ where: {
      email: body.email,
    }});

    if (user) {
      return res.status(401).json({ message: 'this email is already registered' });
    }

    // Creating the user
    user = await sequelize.models.users.create({
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
        //el sistema por default pone type client a todos los nuevos usuarios
        type: 'client',
    })

    // Saving user
    await user.save();
    return res.json({ message: 'Your account was created successfully'});
});

module.exports = router;