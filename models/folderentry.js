"use strict";
module.exports = (sequelize, DataTypes) => {
  var FolderEntry = sequelize.define("folderentry");
  FolderEntry.associate = function(models) {
    models.Folderentry.belongsTo(models.Folder);
    models.Folderentry.belongsTo(models.Candidate);
  };

  return FolderEntry;
};
