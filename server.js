let express = require("express"),
	proxy = require("express-http-proxy"),
	session = require("express-session"),
	cookieParser = require("cookie-parser"),
	morgan = require("morgan"),
	multer = require("multer"),
	flash = require("connect-flash"),
	bodyParser = require("body-parser"),
	passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy,
	bcrypt = require("bcrypt"),
	models = require('./models'),
	routes = require('./routes');
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

function ensureAuthenticatedAdmin(req, res, next) {
	//ADMIN auth given to FAC for dev; Change to ADMIN later
	if (req.isAuthenticated() && (req.user.usertype == 'FAC')) {
		// req.user is available for use here
		console.log("authorized ADMIN", req.originalUrl);
		return next();
	}

	// denied. redirect to login
	console.log("not authorized as ADMIN", req.originalUrl);
	res.redirect("/candidate");
}


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
			models.User.findOne({
				where: {
					email: email,
					password: password
				}
			}).then((user) => {
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
	models.User.findOne({
		where: {
			'id': id
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
		failureRedirect: "/login",
		failureFlash: true
	})
);
app.get("/logout", function(req, res) {
	console.log("logging out");
	req.logout();
	res.redirect("/");
});
app.get("/protected", ensureAuthenticated, function(req, res) {
	res.send("access granted. secure stuff happens here " + req.user.id);
});

/* Log in gateway */
app.get("/gate", ensureAuthenticated, function(req, res){

	if(req.user.usertype == 'FAC'){
		Facilitators.updateNow(req);

		res.redirect('/dashboard');
	}
	if(req.user.usertype=='CAND'){
		res.redirect('/candidate/' + req.user.id);
	}

})

app.use('/', routes);


/*Page Authentications */
//Commented for dev; Uncomment later
app.use(
	"/facilitators",
	ensureAuthenticatedAdmin,
	proxy("http://127.0.0.1:3000/facilitators")
);

app.use(
	"/facilitator",
	ensureAuthenticatedAdmin,
	proxy("http://127.0.0.1:3000/facilitators")
);

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

/*app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: (app.get('env') === 'development') ? err : {}
	});
});*/

app.listen(port, () => console.log(`Listening on port ${port}`));
