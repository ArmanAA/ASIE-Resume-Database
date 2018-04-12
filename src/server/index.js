let express = require("express"),
	proxy = require("express-http-proxy"),
	session = require("express-session"),
	cookieParser = require("cookie-parser"),
	morgan = require("morgan"),
	multer = require("multer"),
	flash = require("connect-flash"),
	path = require("path"),
	bodyParser = require("body-parser"),
	passport = require("passport"),
	sequelize = require("sequelize"),
	LocalStrategy = require("passport-local").Strategy,
	bcrypt = require("bcrypt"),
	models = require('./models'),
	routes = require('./routes'),
	auth = require('./routes/auth'),
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

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const port = process.env.PORT || 3001;
const react_port = 3000;


passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password"
		},
		function(email, password, done) {
			email = email.toLowerCase();
			models.User.findOne({
				where: {
					email: email,
				}
			}).then((user) => {
				if (user == null) {
					console.log("logged in failed - user not found");
					return done(null, false, { message: "Incorrect credentials." });
				}
				else if(bcrypt.compareSync(password, user.password_digest)) {
					console.log("logged in successful");
					return done(null, user);
				}

				console.log("logged in failed - wrong password");
				return done(null, false, { message: "Incorrect credentials." });
			});
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	models.User.findOne({
		where: {
			id: id
		}
	}).then((user) => {
			//console.log(results);
		if (user == null) {
			done(new Error("Wrong user id."));
		}
		done(null, user);
	});
});


app.post("/login", passport.authenticate("local", {
		successRedirect: "/gate",
		failureRedirect: "/login?error",
		failureFlash: true
	})
);
app.get("/logout", function(req, res) {
	console.log("logging out");
	req.logout();
	res.redirect("/");
});
app.get("/protected", auth.user, function(req, res) {
	res.send("access granted. secure stuff happens here " + req.user.id);
});

/* Log in gateway */
app.get("/gate", auth.user, function(req, res){
	if(req.user.isArchived){
		req.logout(); 
		res.redirect('/login');
	}
	if(req.user.usertype == 'FAC'){
		models.Facilitator.update({
			lastOnline: sequelize.fn('NOW'),
		}, {where:
			{id: req.user.id}
		});
		res.redirect('/facilitators');
	}
	if(req.user.usertype=='CAND'){
		res.redirect('/candidate/' + req.user.id);
	}
});


app.use('/', routes);


/*Page Authentications */
//Commented for dev; Uncomment later
/*app.use(
	"/facilitators",
	ensureAuthenticatedAdmin,
	proxy("http://127.0.0.1:3000/facilitators")
);
app.use(
	"/dashboard",
	ensureAuthenticatedAdmin,
	proxy("http://127.0.0.1:3000/dashboard")
);

app.use(
	"/employers",
	ensureAuthenticatedAdmin,
	proxy("http://127.0.0.1:3000/employers")
);

app.use(
	"/facilitator",
	ensureAuthenticatedAdmin,
	proxy("http://127.0.0.1:3000/facilitators")
);

app.use(
	"/candidate",
	ensureAuthenticated,
<<<<<<< HEAD:src/server/index.js
	proxy("http://127.0.0.1:" + react_port + "/candidate")
);*/
app.use('/candidate', auth.user, express.static("www"));
app.use('/candidates', auth.admin, express.static("www"));
app.use('/employers', auth.admin, express.static("www"));
app.use('/facilitators', auth.admin, express.static("www"));
app.use('/facilitator', auth.admin, express.static("www"));
app.use('/tempemp', auth.admin, express.static("www"));

app.get("/robots.txt", function(req, res) {
	res.type("text/plain");
	res.send("User-agent: *\nDisallow: /");
});

app.use(express.static("www"));
app.use(express.static("public"));
app.get("*", (req,res) => res.sendFile(path.resolve(__dirname + "/../../www/index.html"))); //serves the index.html
//app.use("/", proxy("127.0.0.1:" + react_port + "/"));

app.listen(port, () => console.log(`Listening on port ${port}`));