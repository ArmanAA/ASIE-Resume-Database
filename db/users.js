let db = require('./db');

let findUserById = (id, next) => {
  let sql = 'SELECT * FROM users WHERE id = $1';
  db.query(sql, [id])
    .then(function(data) {
      next(data);
    })
    .catch(function(error) {
      console.log('ERROR:', error);
      next(error);
    });
}

let findUser = (email, password, next) => {
  let sql = 'SELECT * FROM users WHERE email = $1 AND password = $2';

  db.query(sql, [email, password])
    .then(function(data) {
      next(data);
    })
    .catch(function(error) {
      console.log('ERROR:', error);
      next(error);
    });
}

let findUserByIdRES = (req, res, next) => {
  let id = req.user.id;
  console.log("id", id);
  findUserById(id, function(results) {
    res.json(results);
  });
}

let findUserRES = (req, res, next) => {
  let email = req.param('email');
  let password = req.param('password');
  findUser(email, password, function(results) {
    res.json(results);
  });
}

exports.findUserById = findUserById;
exports.findUser = findUser;
exports.findUserByIdRES = findUserByIdRES;
exports.findUserRES = findUserRES;