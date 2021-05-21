const express = require('express');
const router = express.Router();

// authenticate
const authenticate = require('../middlewares/authentication');

// Add the required routes
// authenticate => indica que rutas necesitan autenticacion para ingresar (va al middleware authentication)
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));
router.use('/products', authenticate, require('./products'));
router.use('/courses', authenticate, require('./courses'));
router.use('/enrolments', authenticate, require('./enrolments'));


module.exports = router;