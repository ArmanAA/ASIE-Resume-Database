let Sequelize = require("sequelize"),
  sequelize = require("../sequelize");

var attributes = {
  comment: Sequelize.TEXT,
  facilitatorName: Sequelize.STRING,
  employerId: Sequelize.INTEGER
};
var options = {
  omitNull: true
};

var FacilitatorNotes = sequelize.define(
  "facilitatornotes",
  attributes,
  options
);

let addComment = (req, res, next) => {
  let employerID = req.params.id;
  let facilitatorName = "Jimmy Kimmel"; // req.user.name
  let comment = req.params.comment;

  FacilitatorNotes.create({
    facilitatorId: facilitatorId,
    employerId: employerId,
    comment: comment
  })
    .then(next)
    .catch(next);
};
FacilitatorNotes.belongsTo(User, { foreignKey: "id", targetKey: "id" });

exports.addComment = addComment;
