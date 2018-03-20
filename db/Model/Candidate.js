let Sequelize = require("sequelize"),
  sequelize = require("../sequelize"),
  User = require("./User").User;

var attributes = {
  street: Sequelize.STRING,
  city: Sequelize.STRING,
  state: {
    type: Sequelize.ENUM,
    values: [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY"
    ],
    allowNull: true
  },
  zip: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true
    },
    allowNull: true
  },
  regionalclient: {
    type: Sequelize.ENUM,
    values: ["yes", "no", "idk"],
    allowNull: true
  },
  rehabclient: {
    type: Sequelize.ENUM,
    values: ["yes", "no", "idk"],
    allowNull: true
  },
  archived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  profilepic: Sequelize.STRING
};

var options = {
  omitNull: true
};

var Candidate = sequelize.define("candidate", attributes, options);

Candidate.belongsTo(User, { foreignKey: "id", targetKey: "id" });

let getProfileRes = (req, res) => {
  let id = req.user.id;
  getProfile(id, candidate => {
    //console.log(candidate);
    res.json(candidate);
  });
};

let getProfile = (id, next) => {
  Candidate.findOne({
    where: {
      id: id
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
    };
    next(profile);
  });
};

let createProfile = (req, res, next) => {
  //console.log(req.body);
  Candidate.create(
    {
      user: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      },
      profilepic: "profilepic.jpg"
    },
    {
      include: [{ model: User }]
    }
  )
    .then(candidate => {
      next();
    })
    .catch(error => {
      console.log("ERROR: createProfile", error);
      res.json(error);
    });
};

let updateProfile = (req, res, next) => {
  let id = req.user.id;
  req.file = req.file || {};
  let filename = req.file.filename;
  if (req.body.update_zip === "") req.body.update_zip = null;
  if (req.body.update_phone === "") req.body.update_phone = null;
  if (req.body.update_state === "") req.body.update_state = null;
  if (req.body.update_regionalclient === "")
    req.body.update_regionalclient = null;
  if (req.body.update_rehabclient === "") req.body.update_rehabclient = null;
  Candidate.update(
    {
      street: req.body.update_street,
      city: req.body.update_city,
      state: req.body.update_state,
      zip: req.body.update_zip,
      regionalclient: req.body.update_regionalclient,
      rehabclient: req.body.update_rehabclient,
      profilepic: filename
    },
    {
      where: {
        id: id
      }
    }
  )
    .then(candidate_results => {
      User.update(
        {
          firstName: req.body.update_fname,
          lastName: req.body.update_lname,
          email: req.body.update_email,
          phone: req.body.update_phone
        },
        {
          where: {
            id: id
          }
        }
      )
        .then(user_results => {
          res.json({ message: "successful" });
        })
        .catch(error => {
          res.json(error);
        });
    })
    .catch(error => {
      res.json(error);
    });
};

module.exports.Candidate = Candidate;
module.exports.getProfileRes = getProfileRes;
module.exports.createProfile = createProfile;
module.exports.updateProfile = updateProfile;
