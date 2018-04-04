'use strict';
module.exports = (sequelize, DataTypes) => {
	var Facilitator = sequelize.define('Facilitator', {
		lastOnline: {
			type: DataTypes.DATE,
			allowNull: true,
		}
	}, {
		omitNull: true
	});

	Facilitator.associate = function(models) {
		models.Facilitator.belongsTo(models.User, { foreignKey: "id", targetKey: "id" });
	};

	return Facilitator;
};