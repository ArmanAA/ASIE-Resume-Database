let Sequelize = require('sequelize'),
    sequelize = require('../sequelize.js')

var attributes = {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING
  }
}

var options = {
  freezeTableName: true
}

var User = sequelize.define('users', attributes, options);

let findByEP = (email, password, next) => {
  User.findOne({
    where: {
      'email': email,
      'password': password
    }
  }).then(function (user) {
    next(user);
  })
}

let findById = (id, next) => {
  User.findOne({
    where: {
      'id': id
    }
  }).then(function(results) {
    //console.log(results);
    next(results);
  });
}

let findByIdRes = (req, res, next) => {
  let id = req.user.id;
  findById(id, function(user) {
    res.json(user);
  })
}

let createUser = (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  })
  .then(user => {
    req.session.user = user.dataValues;
    res.redirect('/candidate');
  }).catch(error => {
    res.redirect('/signup');
  });
}

//module.exports.User = User;
module.exports.findByEP = findByEP;
module.exports.findById = findById;
module.exports.findByIdRes = findByIdRes;module.exports.createUser = createUser;
