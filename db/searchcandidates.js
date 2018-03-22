let Sequelize = require('sequelize'),
    db = require('./db'),
    Interest = require('./Model/Interest').Interest,
    User = require('./Model/User').User,
    Candidate = require('./Model/Candidate').Candidate;

const Op = Sequelize.Op;

let search = (req, res, next) => {
  let interest = req.query.interests.split(" ").filter(entry => {return entry});//[{interest: "accounting"}, {interest: "administration"}];//req.body.interest;
  let interest_obj = interest.map(interest => {
    return {interest: interest}
  });
  let location = req.query.locations;
  if(location === "")
    location = null;
  if(interest_obj.length == 0)
    interest_obj = null;
  console.log("Search", interest_obj);
  console.log("LOCATION", location);
  searchInterest(interest_obj, location, results => {
    console.log("QUERY RESULTS", results);
    let candidates_results = [];
    if (results) {
      candidates_results = results.map(result => {
        return {
          firstName: result.candidate.user.firstName,
          lastName: result.candidate.user.lastName,
          profilepic: result.candidate.profilepic,
          email: result.candidate.user.email,
          zip: result.candidate.zip
        }
      })
    }
    res.json(candidates_results);

  });
}

let searchInterest = (interest, location, next) => {
  console.log('INTEREST', interest);
  let user = {
    model: Candidate,
    include: [User]
  };
  if(location != null) {
    user.where = {
      city: location
    }
  }
  let query = {
    attributes: ['userId', [Sequelize.fn('count', Sequelize.col('userId')), 'count']],
    group: ['userId','candidate.id','candidate->user.id'],
    include: [
      user
    ]
  }
  if(interest != null) {
    query.where = {
      [Op.or]: interest
    }
  }
  console.log('QUERY',query);
  Interest.findAll(query)
  .then(next)
  .catch(next);
}



exports.search = search;