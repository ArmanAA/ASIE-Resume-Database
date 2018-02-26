let express = require('express'),
    proxy = require('express-http-proxy'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    multer = require('multer'),
    upload = multer(),
    flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    dbinit = require('./db/dbinit'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    User = require('./db/Model/Models').User,
    db = require('./db/db'),
    app = express();

app.use(cookieParser());
app.use(session({secret: "gravy sauce", resave: true, saveUninitialized: true, proxy: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    console.log("authorized", req.originalUrl);
    return next();
  }

  // denied. redirect to login
  console.log("not authorized", req.originalUrl);
  res.redirect('/login');
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findByEP(email, password, function(user) {
      if(user == null) {
        console.log("logged in failed - user");
        return done(null, false, { message: 'Incorrect credentials.' })
      }

      console.log("logged in successful");
      return done(null, user)
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(user) {
    if (user == null) {
      done(new Error('Wrong user id.'))
    }
    //console.log("des", user);
    done(null, user)
  });
})

app.post('/signup', User.createUser);

app.post('/login',
  passport.authenticate('local', { successRedirect: '/candidate',
                                   failureRedirect: '/login',
                                   failureFlash: true }), function(req, res) {
  }
);
app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});
app.get('/protected', ensureAuthenticated, function(req, res) {
  res.send("access granted. secure stuff happens here " + req.user.id);
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/candidate', User.findByIdRes);
app.post('/api/candidate/update/profile', upload.array(), User.updateProfile);
app.get('/api/test', User.findByIdRes);

app.use('/candidate', ensureAuthenticated, proxy('http://localhost:3000/candidate'));

app.use('/', proxy('http://localhost:3000/'));




app.listen(port, () => console.log(`Listening on port ${port}`));