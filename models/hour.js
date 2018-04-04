'use strict';
module.exports = (sequelize, DataTypes) => {
  var Hour = sequelize.define('Hour', {
      sunday: DataTypes.BOOLEAN,
      monday: DataTypes.BOOLEAN,
      tuesday: DataTypes.BOOLEAN,
      wednesday: DataTypes.BOOLEAN,
      thursday: DataTypes.BOOLEAN,
      friday: DataTypes.BOOLEAN,
      saturday: DataTypes.BOOLEAN,
      morning: DataTypes.BOOLEAN,
      afternoon: DataTypes.BOOLEAN,
      evening: DataTypes.BOOLEAN,
      hours: DataTypes.INTEGER
  }, {
    omitNull: true
  });

  Hour.associate = function(models) {
    models.Hour.belongsTo(models.Candidate, {foreignKey: 'id', targetKey: 'id'});
  };

  return Hour;
};