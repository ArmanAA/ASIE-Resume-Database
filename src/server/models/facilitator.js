'use strict';
module.exports = (sequelize, DataTypes) => {
	var Facilitator = sequelize.define('facilitator', {
		lastOnline: {
			type: DataTypes.DATE,
			allowNull: true,
		}
	}, {
		omitNull: true
	});

	Facilitator.associate = function(models) {
		models.Facilitator.belongsTo(models.User, { foreignKey: "id", targetKey: "id"});
		Facilitator.hasMany(models.Folder, {
	      foreignKey: "userId",
	      targetKey: "id"
		});
		Facilitator.hasMany(models.Savedemployer, {
	      foreignKey: "userId",
	      targetKey: "id"
		});
	};

	return Facilitator;
};