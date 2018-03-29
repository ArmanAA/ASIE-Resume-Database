let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    User = require('./User').User


   var options = {}

   var attributes ={}
   var Employer = sequelize.define('employers', options, attributes);
   let getProfile = ()=>{
   	console.log("Get Employer Profile");
   }

  module.exports.Employer = Employer;
  module.exports.getProfile = getProfile;