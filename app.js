const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");

// Set up the express app').

const app = express();
// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var index = require("./server/routes/index");

app.get("*", (req, res) =>
  res.status(200).send({
    message: myuser
  })
);

const authController = require("./server/controllers").auth;
app.post("/register", authController.create);

const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id); // uses _id as idFieldd
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done); // callback version checks id validity automatically
});
passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // 'username' by default
      passwordField: "password"
    },
    function(username, password, done) {
      User.findOne({ where: { username: username } }).then((user, error) => {
        if (error) {
          return done(null);
        }
        if (user && user.validPassword(password)) {
          return done(null, user);
        } else {
          return done(null);
        }
      });
    }
  )
);

// For Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

const User = require("./server//models").User;

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/error" }),
  function(req, res) {
    res.redirect("/success");
  }
);

app.post("/error", (req, res) =>
  res.status(403).send({
    message: "Failed to login"
  })
);

app.post("/success", (req, res) =>
  res.status(200).send({
    message: "Login Successful"
  })
);

module.exports = app;
