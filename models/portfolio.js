'use strict';
module.exports = (sequelize, DataTypes) => {
	var Portfolio = sequelize.define('Portfolio', {
		type: {
			type: DataTypes.ENUM,
			values: ['picture', 'video']
		},
		url: DataTypes.STRING,
		title: DataTypes.STRING,
		thumbnail: DataTypes.STRING,
		description: DataTypes.STRING
	}, {
		omitNull: true
	});

	Portfolio.associate = function(models) {
		models.Portfolio.belongsTo(models.Candidate, {foreignKey: 'userId', targetKey: 'id'});

	};

	return Portfolio;
};