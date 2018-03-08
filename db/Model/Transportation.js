let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    Candidate = require('./Candidate').Candidate

var attributes = {
  car: {
    type: Sequelize.BOOLEAN
  },
  bike: {
    type: Sequelize.BOOLEAN
  },
  metro: {
    type: Sequelize.BOOLEAN
  },
  walk: {
    type: Sequelize.BOOLEAN
  },
  other: {
    type: Sequelize.STRING
  },
  distance: {
    type: Sequelize.INTEGER
  }
}

var options = {
  freezeTableName: false
}

var Transportation = sequelize.define('transportation', attributes, options);

Transportation.belongsTo(Candidate, {foreignKey: 'id', targetKey: 'id'});

let getRes = (req, res) => {
  let id = req.user.id;
  get(id, (transportation) => {
    console.log(transportation);
    res.json(transportation);
  })
}

let get = (id, next) => {
  Transportation.findOne({
    where: {
      'id': id
    },
    include: [Candidate],
    raw:true
  }).then(function(results) {
    console.log(results);
    if(results) {
      var methods = [];
      if(results.car)
        methods.push("Car");
      if(results.bike)
        methods.push("Bike");
      if(results.metro)
        methods.push("Metro");
      if(results.walk)
        methods.push("Walk");
      var other = results.other;
      var distance = results.distance
    }
    
    var transportation = {
      methods: methods || [],
      other: other || "",
      distance: distance || ""
    }
    next(transportation);
  });
}

let create = (req, res, next) => {
  Transportation.create({
    car: req.body.car,
    bike: req.body.bike,
    metro: req.body.metro,
    walk: req.body.walk,
    others: req.body.other,
    distance: req.body.distance
  }, {
    include: [
      { model: Candidate }
    ]
  })
  .then(transportation => {
    next();
  })
  .catch(error => {
    res.json(error);
  })
}

let update = (req, res, next) => {
  let id = req.user.id;
  Transportation.upsert({
    id: id,
    car: req.body.car != null,
    bike: req.body.bike != null,
    metro: req.body.metro != null,
    walk: req.body.walk != null,
    other: req.body.other,
    distance: req.body.distance
  }).then(results => {
    res.json({message: 'successful'})
  }).catch(error => {
    res.json(error)
  })
}

module.exports.getRes = getRes;
module.exports.create = create;
module.exports.update = update;