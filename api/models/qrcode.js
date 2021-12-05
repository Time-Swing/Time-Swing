'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class QRcode extends Model {}

  QRcode.init({
    userId:{
      type: DataTypes.STRING,
    },
    createTime: {
      type: DataTypes.STRING,
    },
    codeStatus: {type: DataTypes.STRING,},
    mobileToken:{type: DataTypes.STRING,},
  }, {
    sequelize,
    modelName: 'qrcode'
  });

  QRcode.associate = (models) => {
    // models.Qrcode.belongsTo(models.User, {
    //     foreignKey: 'mobileToken'
    //   });
  };

  return QRcode;
};