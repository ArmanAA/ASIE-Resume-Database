'use strict';
module.exports = (sequelize, DataTypes) => {
	var Support = sequelize.define('support', {
		name: DataTypes.STRING,
		relationship: DataTypes.STRING,
		email: DataTypes.STRING,
		phone: DataTypes.STRING,
	}, {
		omitNull: true
	});

	Support.associate = function(models) {
		models.Support.belongsTo(models.Candidate, {foreignKey: 'id', targetKey: 'id'});
	};

	return Support;
};