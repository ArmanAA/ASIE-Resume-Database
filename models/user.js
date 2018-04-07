'use strict';

module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		dob: DataTypes.DATE,
		password: DataTypes.STRING,
		phone: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true,
		},
		usertype: {
			type: DataTypes.ENUM,
			values: ['ADMIN', 'FAC', 'CAND'],
			defaultValue: 'CAND'
		},
		isArchived: {
			type: Sequelize.BOOLEAN, 
			defaultValue: false
		},
		salt: DataTypes.STRING
	}, {
		omitNull: true
	});

	// TODO associations

	return User;
}