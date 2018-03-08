let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    Candidate = require('./Candidate').Candidate

var attributes = {
  sunday: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  monday: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  tuesday: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  wednesday: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  thursday: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  friday: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  saturday: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  morning: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  afternoon: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  evening: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  hours: {
    type: Sequelize.INTEGER
  }
}

var options = {
  freezeTableName: false
}

var Hours = sequelize.define('hours', attributes, options);

Hours.belongsTo(Candidate, {foreignKey: 'id', targetKey: 'id'});

var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var parts_of_day = ["morning", "afternoon", "evening"];


let getRes = (req, res) => {
  let id = req.user.id;
  get(id, (transportation) => {
    //console.log(transportation);
    res.json(transportation);
  })
}

let get = (id, next) => {
  Hours.findOne({
    where: {
      'id': id
    },
    include: [Candidate],
    raw:true
  }).then(function(results) {
    //console.log(results);
    results = results || {};
    let results_days = [];
    let results_times = [];
    let hours = results.hours;
    if(results.sunday)
      results_days.push("Sunday");
    if(results.monday)
      results_days.push("Monday");
    if(results.tuesday)
      results_days.push("Tuesday");
    if(results.wednesday)
      results_days.push("Wednesday");
    if(results.thursday)
      results_days.push("Thursday");
    if(results.friday)
      results_days.push("Friday");
    if(results.saturday)
      results_days.push("Saturday");
    if(results.morning)
      results_times.push("Morning");
    if(results.afternoon)
      results_times.push("Afternoon");
    if(results.evening)
      results_times.push("Evening");
    next({days: results_days, times: results_times, hours: hours});
  });
}

let upsert = (req, res, next) => {
  console.log(req.body);
  let id = req.user.id;
  Hours.upsert({
    id: id,
    sunday: req.body.sunday != null,
    monday: req.body.monday != null,
    tuesday: req.body.tuesday != null,
    wednesday: req.body.wednesday != null,
    thursday: req.body.thursday != null,
    friday: req.body.friday != null,
    saturday: req.body.saturday != null,
    morning: req.body.morning != null,
    afternoon: req.body.afternoon != null,
    evening: req.body.evening != null,
    hours: req.body.hours
  })
  .then(transportation => {
    res.json({message: 'successful'})
  })
  .catch(error => {
    res.json(error);
  })
}

module.exports.getRes = getRes;
module.exports.update = upsert;