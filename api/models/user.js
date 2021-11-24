'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs')

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
    hashedPassword: {type: DataTypes.STRING,},
    password: {
        type: DataTypes.VIRTUAL,
        validate:{
          isLongEnough:(val)=>{
            if(val.length < 7 ){
              throw new Error("Please choose a longer password")
            }
          }
        },
    },
    userPhone: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 250],
        }
    },
  }, {
    sequelize,
    modelName: 'user'
  });

  User.associate = (models) => {
    // associations can be defined here
  };

  User.beforeSave((user, options) => {
    if(user.password) {
      user.hashedPassword = bcrypt.hashSync(user.password, 10);
    }
  });
  return User;
};