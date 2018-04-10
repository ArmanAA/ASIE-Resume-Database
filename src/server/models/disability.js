'use strict';
module.exports = (sequelize, DataTypes) => {
	var Disability = sequelize.define('disability', {
		disability: DataTypes.STRING,
	}, {
		omitNull: true
	});

	Disability.associate = function(models) {
		models.Disability.belongsTo(models.Candidate, { foreignKey: "userId", targetKey: "id" });
	};

	return Disability;
};