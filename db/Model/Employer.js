let Sequelize = require("sequelize"),
  sequelize = require("../sequelize");

var attributes = {
  archive: Sequelize.BOOLEAN,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  subject: Sequelize.STRING,
  message: Sequelize.TEXT
};
var options = {
  omitNull: true
};

var Employer = sequelize.define("employer", attributes, options);

let createEmployer = (req, res, next) => {
  Employer.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  })
    .then(user => {
      next();
    })
    .catch(error => {
      console.log("ERROR: createEmployer", error);
      res.json(error);
    });
};
module.exports.Employer = Employer;
module.exports.createEmployer = createEmployer;
