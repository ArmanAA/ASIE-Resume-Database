'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transportation = sequelize.define('Transportation', {
    car: DataTypes.BOOLEAN,
    bike: DataTypes.BOOLEAN,
    metro: DataTypes.BOOLEAN,
    walk: DataTypes.BOOLEAN,
    other: DataTypes.STRING,
    distance: DataTypes.INTEGER
  }, {
    omitNull: true
  });

  Transportation.associate = function(models) {
    models.Transportation.belongsTo(models.Candidate, {foreignKey: 'id', targetKey: 'id'});
  };

  return Transportation;
};