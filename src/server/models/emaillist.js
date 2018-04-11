'use strict';
module.exports = (sequelize, DataTypes) => {
	var Emaillist = sequelize.define('emaillist', {}, {
		omitNull: true
	});

	Emaillist.associate = function(models) {
		models.Emaillist.belongsTo(models.Facilitator, { foreignKey: "id", targetKey: "id", foreignKeyConstraint: true, onDelete: 'cascade'});
	};

	return Emaillist;
};