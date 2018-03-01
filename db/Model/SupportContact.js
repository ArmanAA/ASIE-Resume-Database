let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    Candidate = require('./Candidate')

var attributes = {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isNumeric: true
    }
  },
}

var options = {
  freezeTableName: true
}

var SupportContact = sequelize.define('supportcontact', attributes, options);

SupportContact.belongsTo(Candidate);