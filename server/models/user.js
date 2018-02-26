"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };

  var bCrypt = require("bcrypt-nodejs");

  User.generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
  };

  User.existsForUsername = function(username) {
    return User.count({ where: { username: username } }).then(count => {
      return count != 0;
    });
  };

  User.prototype.validPassword = function(password) {
    return bCrypt.compareSync(password, this.password);
  };

  return User;
};
