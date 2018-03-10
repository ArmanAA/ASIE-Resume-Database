let Sequelize = require("sequelize"),
 sequelize = require("../sequelize"),
 Candidate = require("./Candidate").Candidate;

var attributes = {
  title: {
    type: Sequelize.STRING
  },
  from: {
    type: Sequelize.INTEGER
  },
  company: {
    type: Sequelize.STRING
  },
  to: {
    type: Sequelize.INTEGER
  },
  currently: {
    type: Sequelize.BOOLEAN
  },
  description: {
    type: Sequelize.STRING
  }
};

var options = {
  freezeTableName: false
};
var Experiences = sequelize.define("experiences", attributes, options);

Experiences.belongsTo(Candidate, { foreignKey: "userId", targetKey: "id" });

let getRes = (req, res) => {
  let id = req.user.id;
  get(id, experiences => {
    //console.log(transportation);
    res.json(experiences);
  });
};

let get = (id, next) => {
  Experiences.findAll({
    where: {
      userId: id
    },
    raw: true
  }).then(function(results) {
    //console.log(results);
    let experiences = [];
    if(results) {
      results.forEach((result) => {
        let title = result.title;
        let from = result.from;
        let to = result.to;
        let company = result.company;
        let currently = result.currently;
        let description = result.description;
        let experience = {
          title: title,
          from: from,
          to: to,
          company: company,
          currently: currently,
          description: description
        }
        experiences.push(experience);
      })
    }
    next(experiences);
  });
};

let create = (req, res, next) => {
 Experiences.create(
   {
      title: req.body.title,
      from: req.body.from,
      company: req.body.company,
      to: req.body.to,
      currently: req.body.currently,
      description: req.body.description
   },
   {
     include: [{ model: Candidate }]
   }
 )
  .then(experiences => {
    next();
  })
  .catch(error => {
    res.json(error);
  });
};

let update = (req, res, next) => {
  let id = req.user.id;
  //console.log(req.body);
  Experiences.upsert({
    userId: id,
    title: req.body.title,
    from: req.body.from,
    company: req.body.company,
    to: req.body.to,
    currently: req.body.currently != null,
    description: req.body.description
  })
  .then(results => {
    res.json({ message: "successful" });
  })
  .catch(error => {
    res.json(error);
  });
};

module.exports.Experiences = Experiences;
module.exports.getRes = getRes;
module.exports.update = update;