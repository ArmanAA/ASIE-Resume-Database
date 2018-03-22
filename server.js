let express = require("express"),
  proxy = require("express-http-proxy"),
  session = require("express-session"),
  cookieParser = require("cookie-parser"),
  morgan = require("morgan"),
  multer = require("multer"),
  flash = require("connect-flash"),
  bodyParser = require("body-parser"),
  dbinit = require("./db/dbinit"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  bcrypt = require("bcrypt"),
  Model = require("./db/Model/Models"),
  User = require("./db/Model/User"),
  Employer = require("./db/Model/Employer"),
  Candidate = require("./db/Model/Candidate"),
  Transportation = require("./db/Model/Transportation"),
  Hours = require("./db/Model/Hours"),
  Skills = require("./db/Model/Skills"),
  Experience = require("./db/Model/Experience"),
  Interest = require("./db/Model/Interest"),
  Portfolio = require("./db/Model/Portfolio"),
  SearchCandidates = require("./db/searchcandidates"),
  SearchEmployers = require("./db/searchemployers"),
  db = require("./db/db"),
  // delete this after dev
  user_resp = require("./profile.js"),
  app = express();

app.use(cookieParser());
app.use(
  session({
    secret: "gravy sauce",
    resave: true,
    saveUninitialized: true,
    proxy: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
const port = process.env.PORT || 3001;
let portfolio_storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "client/public/portfolio/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + ".jpg"); //Appending .jpg
  }
});
let portfolio_upload = multer({ storage: portfolio_storage });
let profile_storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "client/public/profile/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + ".jpg"); //Appending .jpg
  }
});
let profile_update = multer({ storage: profile_storage });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    console.log("authorized", req.originalUrl);
    return next();
  }

  // denied. redirect to login
  console.log("not authorized", req.originalUrl);
  res.redirect("/login");
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      User.findByEP(email, password, function(user) {
        if (user == null) {
          console.log("logged in failed - user");
          return done(null, false, { message: "Incorrect credentials." });
        }

        console.log("logged in successful");
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(user) {
    if (user == null) {
      done(new Error("Wrong user id."));
    }
    //console.log("des", user);
    done(null, user);
  });
});

app.post("/signup", Candidate.createProfile, (req, res) => {
  res.redirect("/");
});

app.post("/contactus", Employer.createEmployer, (req, res) => {
  res.redirect("/");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/candidate",
    failureRedirect: "/login",
    failureFlash: true
  }),
  function(req, res) {}
);
app.get("/logout", function(req, res) {
  console.log("logging out");
  req.logout();
  res.redirect("/");
});
app.get("/protected", ensureAuthenticated, function(req, res) {
  res.send("access granted. secure stuff happens here " + req.user.id);
});

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

//app.get('/api/candidate', User.findByIdRes);
app.get("/api/candidate", (req, res) => {
  res.json(user_resp.sample_user);
});
app.get("/api/candidate/profile", Candidate.getProfileRes);
app.get("/api/candidate/experience", Experience.getRes);
app.get("/api/candidate/education", (req, res) => {
  res.json(user_resp.education);
});
app.get("/api/candidate/skills", Skills.getRes);
app.get("/api/candidate/interest", Interest.getRes);
app.get("/api/candidate/hours", Hours.getRes);
app.get("/api/candidate/transportation", Transportation.getRes);
app.get("/api/candidate/portfolio", Portfolio.getRes);

app.post(
  "/api/candidate/update/profile",
  profile_update.single("update_image"),
  Candidate.updateProfile
);
app.post(
  "/api/candidate/update/experience",
  portfolio_upload.array(),
  Experience.update
);
app.post("/api/candidate/update/skills", Skills.update);
app.post("/api/candidate/update/interest", Interest.update);
app.post(
  "/api/candidate/update/transportation",
  portfolio_upload.array(),
  Transportation.update
);
app.post("/api/candidate/update/hours", portfolio_upload.array(), Hours.update);
app.post(
  "/api/candidate/update/portfolio",
  portfolio_upload.single("image"),
  Portfolio.update
);

app.get("/api/search/candidate", SearchCandidates.search);
app.get("/api/search/employers", SearchEmployers.search);

app.use(
  "/candidate",
  ensureAuthenticated,
  proxy("http://127.0.0.1:3000/candidate")
);

app.get("/robots.txt", function(req, res) {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
});

app.use("/", proxy("127.0.0.1:3000/"));

app.listen(port, () => console.log(`Listening on port ${port}`));
