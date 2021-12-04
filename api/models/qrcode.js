'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class QRcode extends Model {}

  QRcode.init({
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

//   QRcode.beforeSave((user, options) => {
//     if(user.password) {
//       user.hashedPassword = bcrypt.hashSync(user.password, 10);
//     }
//     if(user.userName && user.userPhone){
//       const toeknFactor = user.userName + user.userPhone;
//       user.mobileToken = bcrypt.hashSync(toeknFactor,10);
//     }
//   });
  return QRcode;
};