let Sequelize = require("sequelize"),
  sequelize = require("../sequelize");
User = require("./User").User;

var attributes = {
  lastLogIn: Sequelize.DATE
};
var options = {
  omitNull: true
};

var Facilitator = sequelize.define("facilitator", attributes, options);

Facilitator.belongsTo(User, { foreignKey: "id", targetKey: "id" });
