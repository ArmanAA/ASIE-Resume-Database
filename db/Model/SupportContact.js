let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    Candidate = require('./Candidate')

var attributes = {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isNumeric: true
    }
  },
}

var options = {
  omitNull: true
}

var SupportContact = sequelize.define('supportcontact', attributes, options);

SupportContact.belongsTo(Candidate);