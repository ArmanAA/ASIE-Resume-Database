let express = require('express'),
    proxy = require('express-http-proxy'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    multer = require('multer'),
    upload = multer(),
    flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    dbinit = require('./db/dbinit'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    Model = require('./db/Model/Models'),
    User = require('./db/Model/User'),
    Candidate = require('./db/Model/Candidate'),
    Skills = require('./db/Model/Skills'),
    db = require('./db/db'),
    // delete this after dev
    user_resp = require('./profile.js'),
    app = express();

app.use(cookieParser());
app.use(session({secret: "gravy sauce", resave: true, saveUninitialized: true, proxy: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
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

app.post('/signup',
  Candidate.createProfile,
  (req, res) => {
    res.redirect('/login');
  });

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

//app.get('/api/candidate', User.findByIdRes);
app.get('/api/candidate', (req, res) => {
  res.json(user_resp.sample_user);
});
app.get('/api/candidate/profile', Candidate.getProfileRes);
app.get('/api/candidate/experience', (req, res) => {
  res.json(user_resp.experience);
});
app.get('/api/candidate/education', (req, res) => {
  res.json(user_resp.education);
});
app.get('/api/candidate/skills', Skills.getRes);
app.get('/api/candidate/interest', (req, res) => {
  res.json(user_resp.interest);
});
app.get('/api/candidate/availability', (req, res) => {
  res.json(user_resp.availability);
});
app.get('/api/candidate/transportation', (req, res) => {
  res.json(user_resp.transportation);
});
app.get('/api/candidate/portfolio', (req, res) => {
  res.json(user_resp.portfolio);
});


app.post('/api/candidate/update/profile', upload.array(), Candidate.updateProfile);
app.post('/api/candidate/update/skills', Skills.update);
app.get('/api/test', Candidate.getProfileRes);

app.use('/candidate', ensureAuthenticated,
                      proxy('http://127.0.0.1:3000/candidate'));


app.get('/robots.txt', function(req, res) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

app.use('/', proxy('127.0.0.1:3000/'));




app.listen(port, () => console.log(`Listening on port ${port}`));