const { Sequelize } = require('sequelize');

// Importing models
const Product = require('./models/Product');
const Review = require('./models/Review');
const User = require('./models/user');

// Database connection
const sequelize = new Sequelize('projectschool', 'root', '12345Facil', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
  port: 3306
});

// Getting models
const models = [
  Product,
  Review,
  User,
];

// Registering models into Sequelize
for (let model of models) {
  model(sequelize);
}

// {force: true } fuerza migracion, para no borrar lo que  tengo regreso el force a false
sequelize.sync({ force: false })
    .then(() => console.log("Tableas creadas"));


// Configuring relations
const { products, reviews } = sequelize.models;
reviews.belongsTo(products); // Relation one-to-one in reviews table

module.exports = sequelize;