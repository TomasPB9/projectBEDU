const { Sequelize } = require('sequelize');

// Importing models
const Product = require('./models/product');
const Review = require('./models/review');
const User = require('./models/user');
const Course = require('./models/course');
const Enrolment = require('./models/enrolment');

// Database connection
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DIALECT,
  logging: false,
});


// Getting models
const models = [
  Product,
  Review,
  User,
  Course,
  Enrolment,
];

// Registering models into Sequelize
for (let model of models) {
  model(sequelize);
}

//{force: true } fuerza migracion, para no borrar lo que  tengo regreso el force a false
  //  sequelize.sync({ force: true })
  //      .then(() => console.log("Tableas creadas"));


// Configuring relations
const { products, reviews, courses, users, enrolments } = sequelize.models;
reviews.belongsTo(products); // Relation one-to-one in reviews table

//Relation of course and user with enrolment
// enrolments.belongsTo(users);
// enrolments.belongsTo(courses);



module.exports = sequelize;