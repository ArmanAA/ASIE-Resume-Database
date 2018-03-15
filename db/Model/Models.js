var sequelize = require('../sequelize');

sequelize.sync()
  .then(() => console.log('tables have been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occured', error));