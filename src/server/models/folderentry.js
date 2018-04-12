"use strict";
module.exports = (sequelize, DataTypes) => {
  var Folderentry = sequelize.define("folderentry");
  Folderentry.associate = function(models) {
    models.Folderentry.belongsTo(models.Folder);
    models.Folderentry.belongsTo(models.Candidate);
  };

  return Folderentry;
};