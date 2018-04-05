'use strict';

module.exports = (sequelize, DataTypes) => {
	var Match = sequelize.define('match', {

	}, {
		omitNull: true
	});

	// TODO associations
	Match.associate = function(models) {
		Match.belongsTo(models.Employer);
		Match.belongsTo(models.Candidate);
		Match.belongsTo(models.Facilitator);
	}

	return Match;
};