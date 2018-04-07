'use strict';
module.exports = (sequelize, DataTypes) => {
	var Interest = sequelize.define('interest', {
		type: {
			type: DataTypes.ENUM,
			values: ['personal', 'career']
		},
		interest: DataTypes.STRING
	}, {
		omitNull: true
	});

	Interest.associate = function(models) {
		models.Interest.belongsTo(models.Candidate, {foreignKey: 'userId', targetKey: 'id'});
	};

	return Interest;
};