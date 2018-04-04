'use strict';

module.exports = (sequelize, DataTypes) => {
  var Employer = sequelize.define('Employer', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {
    omitNull: true
  });

  // TODO associations
  Employer.associate = function(models) {
    
  }

  return Employer;
};