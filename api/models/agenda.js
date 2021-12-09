' use strict'

const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes)=>{
    class Agenda extends Model{}

    Agenda.init({
        timeStart:{
            type:DataTypes.STRING,
            validate:{
                len:[3,250],
                notEmpty:true,
            }
        },
        timeEnd:{
            type:DataTypes.STRING,
        },
        title:{
            type:DataTypes.STRING,
            validate:{
                len:[3,250],
                notEmpty:true
            }
        },
        content:{
            type:DataTypes.STRING,
        },
        address:{
            type:DataTypes.STRING,
        },
    },{
        sequelize,
        modelName:'agenda'
    });

    Agenda.associate = (models) => {
        models.Agenda.belongsTo(models.User);
      };
    
    return Agenda;
};