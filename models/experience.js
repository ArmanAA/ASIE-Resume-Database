'use strict';
module.exports = (sequelize, DataTypes) => {
  var Experience = sequelize.define('Experience', {
      title: DataTypes.STRING,
      from: DataTypes.INTEGER,
      company: DataTypes.STRING,
      to: DataTypes.INTEGER,
      currently: DataTypes.BOOLEAN,
      description: DataTypes.STRING
  }, {
    omitNull: true
  });

  Experience.associate = function(models) {
    models.Experience.belongsTo(models.Candidate, { foreignKey: "userId", targetKey: "id" });
  };

  return Experience;
};