let Sequelize = require("sequelize"),
  sequelize = require("../sequelize");

var attributes = {
  facilitatorId: Sequelize.INTEGER,
  employerId: Sequelize.INTEGER
};
var options = {
  omitNull: true
};

var Facilitatorsemployerlist = sequelize.define(
  "facilitatorsemployerlist",
  attributes,
  options
);

let addEmployer = (req, res, next) => {
  let facilitatorId = 1; //req.user.id;
  let employerId = req.params.id;

  Facilitatorsemployerlist.create({
    facilitatorId: facilitatorId,
    employerId: employerId
  })
    .then(next)
    .catch(next);
};

let removeEmployer = (req, res, next) => {
  let facilitatorId = 1; //req.user.id;
  let employerId = req.params.id;

  Facilitatorsemployerlist.destroy({
    // attributes: ["email", "firstName", "lastName", "subject"],
    where: {
      facilitatorId: facilitatorId,
      employerId: employerId
    },
    force: true,
    raw: true
  })
    .then(next)
    .catch(next);
};

exports.addEmployer = addEmployer;
exports.removeEmployer = removeEmployer;
