let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    User = require('./User').User

var attributes = {
  street: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true
    }
  },
  regionalclient: {
    type: Sequelize.BOOLEAN
  },
  rehabclient: {
    type: Sequelize.BOOLEAN
  },
  website: {
    type: Sequelize.STRING
  },
  archived: {
    type: Sequelize.BOOLEAN
  },
  profilepic: {
    type: Sequelize.STRING,
    defaultValue: 'profilepic.jpg'
  }
}

var options = {
  freezeTableName: false
}

var Candidate = sequelize.define('candidate', attributes, options);

Candidate.belongsTo(User, {foreignKey: 'id', targetKey: 'id'});

let getProfileRes = (req, res) => {
  let id = req.user.id;
  getProfile(id, (candidate) => {
    console.log(candidate);
    res.json(candidate);
  })
}

let getProfile = (id, next) => {
  Candidate.findOne({
    where: {
      'id': id
    },
    include: [User]
  }).then(function(results) {
    //console.log(results);
    var profile = {
      fname: results.user.firstName,
      lname: results.user.lastName,
      street: results.street,
      city: results.city,
      state: results.state,
      zip: results.zip,
      phone: results.user.phone,
      email: results.user.email,
      birthday: results.user.dob,
      regionalclient: results.regionalclient,
      rehabclient: results.rehabclient,
      conditions: [],
      profilepic: results.profilepic
    }
    next(profile);
  });
}

let createProfile = (req, res, next) => {
  Candidate.create({
    user: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }
  }, {
    include: [
      { model: User }
    ]
  })
  .then(candidate => {
    next();
  })
  .catch(error => {
    console.log("ERROR: createProfile", error);
    res.json(error);
  })
}

let updateProfile = (req, res, next) => {
  let id = req.user.id;
  console.log(req.body);
  req.file = req.file || {};
  let filename = req.file.filename;
  Candidate.update({
    user: {
      firstName: req.body.update_fname,
      lastName: req.body.update_lname,
      email: req.body.update_email,
      phone: req.body.update_phone
    },
    street: req.body.update_street,
    city: req.body.update_city,
    state: req.body.update_state,
    zip: req.body.update_zip,
    regionalclient: req.body.update_regionalclient != null,
    rehabclient: req.body.update_rehabclient != null,
    profilepic: filename
  }, {
    where: {
      'id': id
    },
    include: [
      { model: User }
    ]
  }).then(results => {
    res.json({message: 'successful'})
  }).catch(error => {
    res.json(error)
  })
}

module.exports.Candidate = Candidate;
module.exports.getProfileRes = getProfileRes;
module.exports.createProfile = createProfile;
module.exports.updateProfile = updateProfile;