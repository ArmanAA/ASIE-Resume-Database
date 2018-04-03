let Sequelize = require('sequelize'),
    sequelize = require('../sequelize')

var attributes = {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  dob: Sequelize.DATE,
  password: Sequelize.STRING,
  phone: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
    validate: {
      isNumeric: true
    }
  },
  isArchived: {
    type: Sequelize.BOOLEAN, 
    defaultValue: false
  },
  usertype: {
    type: Sequelize.ENUM,
    values: ['ADMIN', 'FAC', 'CAND'],
    defaultValue: 'CAND'
  },
  salt: Sequelize.STRING
}

var options = {
  omitNull: true
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

let createUser = (req, res, next) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    usertype: 'CAND',
  })
  .then(user => {
    req.session.user = user.dataValues;
    next();
  })
  .catch(error => {
    console.log("ERROR: createUser", error);
    res.json(error);
  });
}

let updateProfile = (req, res, next) => {
  let id = req.user.id;
  User.update({
    firstName: req.body.update_fname,
    lastName: req.body.update_lname
  }, {
    where: {
      'id': id
    }
  }).then(results => {
    res.json({message: 'successful'})
  }).catch(error => {
    res.json({message: 'failed'})
  })
}

module.exports.User = User;
module.exports.findByEP = findByEP;
module.exports.findById = findById;
module.exports.findByIdRes = findByIdRes;
module.exports.createUser = createUser;
module.exports.updateProfile = updateProfile;