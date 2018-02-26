const User = require("../models").User;

module.exports = {
  create(req, res) {
    User.existsForUsername(req.body.username).then(isUnique => {
      if (isUnique) {
        return res.status(401).send("Booo");
      } else {
        return User.create({
          username: req.body.username,
          password: User.generateHash(req.body.password)
        })
          .then(user =>
            res.status(201).send({
              user: user.username,
              status: "OK"
            })
          )
          .catch(error => res.status(400).send(error));
      }
    });
  }
};
