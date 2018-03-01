let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    Candidate = require('./Candidate').Candidate

var attributes = {
  skills: {
    type: Sequelize.STRING
  }
}

var options = {
  freezeTableName: false
}

var Skills = sequelize.define('skills', attributes, options);

Skills.belongsTo(Candidate, {foreignKey: 'userId', targetKey: 'id'});

let getRes = (req, res) => {
  let id = 1;//req.user.id;
  get(id, (skills) => {
    console.log(skills);
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
    console.log(results);


    var skills = [];
    results.forEach(function(skill) {
      skills.push(skill.skills);
    })
    next(skills);
  });
}

let update = (req, res, next) => {
  let id = req.user.id;
  console.log(req.body);
  Skills.update({
    skills: req.body.skills,
  }, {
    where: {
      'userId': id
    },
    include: [
      { model: Candidate }
    ]
  }).then(results => {
    res.json({message: 'successful'})
  }).catch(error => {
    res.json(error)
  })
}

module.exports.Skills = Skills;
module.exports.getRes = getRes;
module.exports.update = update;