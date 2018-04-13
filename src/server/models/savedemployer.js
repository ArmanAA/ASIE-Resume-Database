"use strict";
module.exports = (sequelize, DataTypes) => {
  var Savedemployer = sequelize.define("savedemployer");
  Savedemployer.associate = function(models) {
    models.Savedemployer.belongsTo(models.Facilitator, {
      foreignKey: "userId",
      targetKey: "id"
    });
    models.Savedemployer.belongsTo(models.Employer);
  };

  return Savedemployer;
};