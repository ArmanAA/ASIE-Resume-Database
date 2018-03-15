let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    Candidate = require('./Candidate').Candidate

var attributes = {
  skills: Sequelize.STRING
}

var options = {
  omitNull: true
}

var Skills = sequelize.define('skills', attributes, options);

Skills.belongsTo(Candidate, {foreignKey: 'userId', targetKey: 'id'});

let getRes = (req, res) => {
  let id = req.user.id;
  get(id, (skills) => {
    //console.log(skills);
    res.json(skills);
  })
}

let get = (id, next) => {
  Skills.findAll({
    where: {
      'userId': id,
    },
    raw: true
  }).then(function(results) {
    //console.log(results);


    var skills = [];
    results.forEach(function(skill) {
      skills.push(skill.skills);
    })
    next(skills);
  });
}

let update = (req, res, next) => {
  let id = req.user.id;
  let skill = req.body.skill;
  let type = req.body.type;
  //console.log("skill:", skill);
  if(type == "add") {
    Skills.create({
      'userId': id,
      'skills': skill
    }).then(results => {
      res.json({message: 'successful'})
    }).catch(error => {
      res.json(error)
    })
  }
  else {
    Skills.destroy({
      where: {
        'userId': id,
        'skills': skill
      }
    })
  }
}

module.exports.getRes = getRes;
module.exports.update = update;