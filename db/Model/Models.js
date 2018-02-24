var User = require('./User.js'),
    sequelize = require('../sequelize.js')

sequelize.sync()
  .then(() => console.log('tables have been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occured', error));
 
// you can define relationships here
 
module.exports.User = User;