let Sequelize = require('sequelize'),
    db = require('./db'),
    Interest = require('./Model/Interest').Interest,
    User = require('./Model/User').User,
    Candidate = require('./Model/Candidate').Candidate;

const Op = Sequelize.Op;

let search = (req, res, next) => {
  let interest = [{interest: "accounting"}, {interest: "administration"}];//req.body.interest;
  searchInterest(interest, results => {
    let candidates_results = results.map(result => {
      return {
        firstName: result.candidate.user.firstName,
        lastName: result.candidate.user.lastName,
        profilepic: result.candidate.profilepic,
        email: result.candidate.user.email,
        zip: result.candidate.zip
      }
    })
    res.json(candidates_results);
  });
}

let searchInterest = (interest, next) => {
  Interest.findAll({
    where: {
      [Op.or]: interest
    },
    attributes: ['userId', [Sequelize.fn('count', Sequelize.col('userId')), 'count']],
    group: ['userId','candidate.id','candidate->user.id'],
    include: [
      {
        model: Candidate,
        include: [User]
      }
    ]
  })
  .then(next)
  .catch(next);
}

exports.search = search;