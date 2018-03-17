let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    Candidate = require('./Candidate').Candidate

let attributes = {
  type: {
    type: Sequelize.ENUM,
    values: ['personal', 'career']
  },
  interest: Sequelize.STRING
}

let options = {
  omitNull: true
}

let Interest = sequelize.define('interest', attributes, options);

Interest.belongsTo(Candidate, {foreignKey: 'userId', targetKey: 'id'});

let getRes = (req, res) => {
  let id = req.user.id;
  get(id, (interest) => {
    //console.log(interest);
    res.json(interest);
  })
}

let get = (id, next) => {
  Interest.findAll({
    where: {
      'userId': id,
    },
    raw: true
  }).then(function(results) {
    //console.log("interest - get", results);

    var personal = [];
    var career = [];
    results.forEach(function(interest) {
      if(interest.type == "personal") {
        personal.push(interest.interest);
      }
      else if(interest.type == "career") {
        career.push(interest.interest);
      }
    })
    next({career_interest: career, personal_interest: personal});
  });
}

let update = (req, res, next) => {
  let id = req.user.id;
  let interest = req.body.interest;
  let type = req.body.type;
  let action = req.body.action;
  if(action == "add") {
    Interest.create({
      'userId': id,
      'interest': interest,
      'type': type
    }).then(results => {
      res.json({message: 'successful'})
    }).catch(error => {
      res.json(error)
    })
  }
  else {
    Interest.destroy({
      where: {
        'userId': id,
        'type': type,
        'interest': interest
      }
    })
  }
}

module.exports.Interest = Interest;
module.exports.getRes = getRes;
module.exports.update = update;