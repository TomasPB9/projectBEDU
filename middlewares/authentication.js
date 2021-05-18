const jwt = require('jsonwebtoken');
const sequelize = require('../db');

//next => es la parte que sigue del archivo index.js en routes
const authenticate = (req, res, next) => {
    const { authorization } = req.headers;

    jwt.verify(authorization, 'secretkey', async (err, decoded) => {
        if(err) return res.status(401).json({ message: 'Unauthorized'});
        //consulta a la DB y si existe se va a next()
        req.user = await sequelize.models.users.findOne({ where: { id: decoded.userId }});
        next();
    })
}

module.exports = authenticate;