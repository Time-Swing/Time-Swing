'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init({
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
      isEmail: true,
      },
    },
    passwordHash: { type: DataTypes.STRING },
    hashedPassword: {
        type: DataTypes.VIRTUAL,
      },

    userPhone: {
        type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'user'
  });

  User.associate = (models) => {
    // associations can be defined here
  };

  User.beforeSave((user, options) => {
    if(user.hashedPassword) {
      user.passwordHash = bcrypt.hashSync(user.hashedPassword, 10);
    }
  });
  
  return User;
};