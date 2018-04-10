'use strict';

var bcrypt = require('bcrypt');

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
		password_digest: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		password: {
			type: DataTypes.VIRTUAL,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
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
			type: DataTypes.BOOLEAN, 
			defaultValue: false
		},
		salt: DataTypes.STRING
	}, {
		omitNull: true
	});

	// TODO associations

	let hashSecurePassword = (password) => {
		return new Promise((resolve, reject) => {
			bcrypt.hash(password, 10, function(err, hash) {
				if (err) return console.log(err);
				console.log("HASH", hash);
				resolve(hash);
			});
		});
	};

	User.beforeCreate(function(user, options) {
		console.log("CALLS BEFORE CREATE", user);
		return hashSecurePassword(user.password).then(password => {
			user.set('password_digest', password);
		});
	})

	User.beforeUpdate(function(user, options) {
		console.log("CALLS BEFORE UPDATE", user);
		return hashSecurePassword(user.password).then(password => {
			user.set('password_digest', password);
		});
	})

	return User;
}

