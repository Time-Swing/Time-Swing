' use strict'

const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes)=>{
    class Agenda extends Model{}

    Agenda.init({
        timeStart:{
            type:DataTypes.DATE,
            validate:{
                len:[8,250],
                notEmpty:true,
            }
        },
        timeEnd:{
            type:DataTypes.DATE,
            validate:{
                len:[8,250],
                notEmpty:true,
            }
        }
    },{
        sequelize,
        modelName:'agenda'
    });

    // Genre.associate = (models) => {
    //     // associations can be defined here
    
    //     // This will add genreId to the Movie model and table
    //     models.Genre.hasMany(models.Movie)
    // };
    
    return Agenda;
};