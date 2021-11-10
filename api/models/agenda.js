" use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Agenda extends Model {}

	Agenda.init(
		{
			timeStart: {
				type: DataTypes.DATE,
				validate: {
					len: [8, 250],
					notEmpty: true,
				},
			},
			timeEnd: {
				type: DataTypes.DATE,
				validate: {
					len: [8, 250],
					notEmpty: false,
				},
			},
			title: {
				type: DataTypes.STRING,
				validate: {
					len: [3, 250],
					notEmpty: true,
				},
			},
			content: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: false,
				},
			},
			address: {
				type: DataTypes.STRING,
				validate: {
					len: [3, 250],
					notEmpty: false,
				},
			},
		},
		{
			sequelize,
			modelName: "agenda",
		}
	);

	// Genre.associate = (models) => {
	//     // associations can be defined here

	//     // This will add genreId to the Movie model and table
	//     models.Genre.hasMany(models.Movie)
	// };

	return Agenda;
};
