var User = require('./User'),
    Candidate = require('./Candidate'),
    Transportation = require('./Transportation')
    sequelize = require('../sequelize')

sequelize.sync()
  .then(() => console.log('tables have been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occured', error));
 
// you can define relationships here
 
module.exports.User = User;