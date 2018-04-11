"use strict";
module.exports = (sequelize, DataTypes) => {
  var Folder = sequelize.define("folder", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      omitNull: false
    }
  );
  Folder.associate = function(models) {
    models.Folder.belongsTo(models.Facilitator, {
      foreignKey: "userId",
      targetKey: "id"
    });
    Folder.hasMany(models.Folderentry);
  };

  return Folder;
};