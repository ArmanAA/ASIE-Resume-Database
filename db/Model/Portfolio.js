let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    Candidate = require('./Candidate').Candidate

var attributes = {
  type: {
    type: Sequelize.ENUM,
    values: ['picture', 'video']
  },
  url: Sequelize.STRING,
  title: Sequelize.STRING,
  thumbnail: Sequelize.STRING,
  description: Sequelize.STRING
}

var options = {
  omitNull: true
}

var Portfolio = sequelize.define('portfolio', attributes, options);

Portfolio.belongsTo(Candidate, {foreignKey: 'userId', targetKey: 'id'});

let image_dir = "/portfolio/";

let getRes = (req, res) => {
  let id = req.user.id;
  get(id, (interest) => {
    //console.log(interest);
    res.json(interest);
  })
}

let get = (id, next) => {
  Portfolio.findAll({
    where: {
      'userId': id,
    },
    raw: true
  }).then((results) => {
    let portfolio = [];
      results.forEach((result) => {
        let portfolio_elem = {
          title: result.title,
          url: image_dir + result.url,
          thumbnail: image_dir + result.url,
          description: result.description
        };
        portfolio.push(portfolio_elem);
      })
      next(portfolio);
  });
}

let update = (req, res, next) => {
  //console.log(req.file.filename);
  let id = req.user.id;
  let action = 'add';//req.body.action;
  let type = 'picture';//req.body.type;
  let url = req.file.filename;//req.body.url;
  let title = req.body.title;
  let thumbnail = req.file.filename;
  let description = req.body.description;

  if(action == "add") {
    Portfolio.create({
      'userId': id,
      'type': type,
      'url': url,
      'title': title,
      'thumbnail': thumbnail,
      'description': description
    }).then(results => {
      res.json({message: 'successful'})
    }).catch(error => {
      res.json(error)
    })
  }
  else {
    Portfolio.destroy({
      where: {
        'userId': id,
        'type': type,
        'interest': interest
      }
    })
  }
}

module.exports.getRes = getRes;
module.exports.update = update;