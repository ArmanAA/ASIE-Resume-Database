'use strict';
module.exports = (sequelize, DataTypes) => {
  var Skill = sequelize.define('Skill', {
    skill: DataTypes.STRING
  }, {
    omitNull: true
  });

  Skill.associate = function(models) {
    models.Skill.belongsTo(models.Candidate, {foreignKey: 'userId', targetKey: 'id'});
  };

  return Skill;
};