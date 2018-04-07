'use strict';
module.exports = (sequelize, DataTypes) => {
	var Comment = sequelize.define('comment', {
		comment: DataTypes.TEXT
	}, {
		omitNull: true
	});

	Comment.associate = function(models) {
		models.Comment.belongsTo(models.Employer);
		models.Comment.belongsTo(models.User);
	};

	return Comment;
};