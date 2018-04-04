'use strict';

module.exports = (sequelize, DataTypes) => {
	var Candidate = sequelize.define('Candidate', {
		street: DataTypes.STRING,
		city: DataTypes.STRING,
		state: {
			type: DataTypes.ENUM,
			values:
			[
				"AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
				"HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
				"MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
				"NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
				"SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
			],
			allowNull: true
		},
		zip: {
			type: DataTypes.INTEGER,
			validate: {
				isNumeric: true
			},
			allowNull: true
		},
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
		profilepic: DataTypes.STRING
	}, {
		omitNull: true
	});

	Candidate.associate = function(models) {
		Candidate.belongsTo(models.User, { foreignKey: "id", targetKey: "id" });
	};

	return Candidate;
};