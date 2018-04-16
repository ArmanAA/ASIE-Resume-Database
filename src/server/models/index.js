'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '../../config/config.js')[env];
var db        = {};

if (config.use_env_variable) {
	var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		var model = sequelize['import'](path.join(__dirname, file));
		var name = model.name.charAt(0).toUpperCase() + model.name.slice(1);
		db[name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

sequelize.sync()
	.then(() => {
		console.log('tables have been successfully created, if one doesn\'t exist')
		db.User.findOne({
			where: {
				usertype: "SUPER"
			}
		}).then(is_super_admin => {
			if(is_super_admin == null) {
				db.Facilitator.create({
					user: {
						firstName: "Admin",
						lastName: "Admin",
						email: "admin@localhost.com",
						password: "ZiqnIoZPeIMhFfwe",
						usertype: "SUPER"
					}
				},  {
					include: [db.User]
				}).then(super_admin => {
					console.log("WARNING: No SUPER account was found so one was created.\n" +
						"Read the DOC for login credentials. It is highly recommended to change the default password");
				})
			}
		})
	})
	.catch(error => console.log('This error occured', error));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;