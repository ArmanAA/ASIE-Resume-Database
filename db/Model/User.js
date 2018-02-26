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
<<<<<<< HEAD
  }).catch(error => {
=======
  })
  .catch(error => {
>>>>>>> e31c48858abbf0e289b131ba0e847521518f50e9
    res.redirect('/signup');
  });
}

<<<<<<< HEAD
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
=======
>>>>>>> e31c48858abbf0e289b131ba0e847521518f50e9


//module.exports.User = User;
module.exports.findByEP = findByEP;
module.exports.findById = findById;
module.exports.findByIdRes = findByIdRes;
<<<<<<< HEAD
module.exports.createUser = createUser;
module.exports.updateProfile = updateProfile;
=======
module.exports.createUser = createUser;
>>>>>>> e31c48858abbf0e289b131ba0e847521518f50e9
