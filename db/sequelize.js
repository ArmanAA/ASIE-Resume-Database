var Sequelize = require('sequelize'),
    config = require('./config'),
    sequelize = new Sequelize(config.databaseurl, {logging: false});
 
module.exports = sequelize;