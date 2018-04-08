let models  = require('../models'),
	express = require('express'),
	router  = express.Router();

let api = require('./api');

router.post("/signup", (req, res) => {
	models.Candidate.create({
		user: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		},
		profilepic: "profilepic.jpg"
	}, {
		include: [models.User]
	}).then(candidate => {
		res.redirect("/");
	}).catch(error => {
		console.log("ERROR: createProfile", error);
		res.json(error);
	});
});

router.post("/contactus", (req, res) => {
	models.Employer.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		subject: req.body.subject,
		message: req.body.message
	}).then(user => {
		res.redirect("/contactus?success");
	}).catch(error => {
		console.log("ERROR: createEmployer", error);
		res.redirect("/contactus?error");
		//res.json(error);
	});
});

router.use('/api', api);

module.exports = router;