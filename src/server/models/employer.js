'use strict';

module.exports = (sequelize, DataTypes) => {
	var Employer = sequelize.define('employer', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		subject: DataTypes.STRING,
		message: DataTypes.TEXT
	}, {
		omitNull: true
	});

	Employer.associate = function(models) {
		Employer.hasMany(models.Savedemployer);
	};

	Employer.beforeCreate((employer, options) => {
		employer.email = employer.email.toLowerCase();
	})

	return Employer;
};