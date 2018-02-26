'use strict';
const User = require('../models').User;


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        username: 'John',
        password: User.generateHash('doe'),
        createdAt: new Date(),
        updatedAt: new Date()
        
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};