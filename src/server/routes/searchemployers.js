let models  = require('../models'),
  Sequelize = require('sequelize'),
  express = require('express'),
  router  = express.Router();

const Op = Sequelize.Op;

router.get('/profile/:id', (req, res) => {
  models.Employer.findOne({
    where: {
      id: req.params.id
    },
    raw: true
  }).then((result) => {
    res.json(result);
  });
});

router.get('/', (req, res) => {
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
        lastName: { [Op.iLike]: employer_wild },
        message: { [Op.iLike]: employer_wild }
      }
    };
  });
  searchEmployer(employer_obj, req.user.id, results => {
    //res.json(results);
    let employers_results = results.map(result => {
      return {
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        subject: result.subject,
        message: result.message,
        inMyList: result.savedemployers.length > 0
      };
    });
    res.json(employers_results);
  });
});

let searchEmployer = (name, id, next) => {
  let query = {}
  if(name && name.length > 0) {
    query = {
      // attributes: ["email", "firstName", "lastName", "subject"],
      where: {
        [Op.or]: name
      }
    }
  }
  query.include = [{
    model: models.Savedemployer,
    where: {
      userId: id,
    },
    required: false
  }]
  models.Employer.findAll(query).then(next).catch(next);
};

module.exports = router;