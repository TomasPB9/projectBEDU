const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    type: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    //tareas
    hooks: {
      //antes de insertar en la DB que acabamos de hacer, encripta la contraseña
      beforeCreate: (user) => {
         //salt => herramienta para ser encriptado
        const salt = bcrypt.genSaltSync();
        //da como salida una cadena de texto encriptada
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  });
  //compara contraseña que se manda con la que se tienen en el mismo modelo
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};