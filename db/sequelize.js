var Sequelize = require('sequelize'),
    config = require('./config'),
    sequelize = new Sequelize(config.databaseurl);
 
module.exports = sequelize;