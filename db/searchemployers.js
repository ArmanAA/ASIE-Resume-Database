let Sequelize = require("sequelize"),
  db = require("./db"),
  Employer = require("./Model/Employer").Employer;

const Op = Sequelize.Op;

let search = (req, res, next) => {
  let name = req.query.name;
  let nameArray = name.split(" ").filter(entry => {
    return entry;
  });
  let employer_obj = nameArray.map(employer => {
    let employer_wild = "%" + employer + "%";
    return {
      [Op.or]: {
        email: { [Op.iLike]: employer_wild },
        subject: { [Op.iLike]: employer_wild },
        firstName: { [Op.iLike]: employer_wild },
        lastName: { [Op.iLike]: employer_wild }
      }
    };
  });
  searchEmployer(employer_obj, results => {
    let employers_results = results.map(result => {
      return {
        firstName: result.firstName,
        lastName: result.lastName,
        subject: result.subject
      };
    });
    res.json(employers_results);
  });
};

let searchEmployer = (name, next) => {
  console.log("Employer", name);

  Employer.findAll({
    // attributes: ["email", "firstName", "lastName", "subject"],
    where: {
      [Op.or]: name
    }
  })
    .then(next)
    .catch(next);
};

exports.search = search;
