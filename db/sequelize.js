let Sequelize = require('sequelize'),
    config = require('./config'),
    sequelize = new Sequelize(config.databaseurl, {logging: false, operatorsAliases: false});

module.exports = sequelize;