var UserMeta = require('./User.js'),
    sequelize = require('../sequelize.js')
 
var User = sequelize.define('users', UserMeta.attributes, UserMeta.options);


sequelize.sync()
  .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occured', error));
 
// you can define relationships here
 
module.exports.User = User