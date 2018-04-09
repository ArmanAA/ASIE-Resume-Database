'use strict';

module.exports = (sequelize, DataTypes) => {
	var Candidate = sequelize.define('candidate', {
		city: DataTypes.STRING,
		regionalclient: {
			type: DataTypes.ENUM,
			values: ["yes", "no", "idk"],
			allowNull: true
		},
		rehabclient: {
			type: DataTypes.ENUM,
			values: ["yes", "no", "idk"],
			allowNull: true
		},
		archived: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		profilepic: DataTypes.STRING,
	}, {
		omitNull: true
	});

	Candidate.associate = function(models) {
		Candidate.belongsTo(models.User, { foreignKey: "id", targetKey: "id" });
		Candidate.hasMany(models.Interest, {foreignKey: 'userId', targetKey: 'id'});
	};

	return Candidate;
};