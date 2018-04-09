let models  = require('../models'),
	express = require('express'),
	router  = express.Router(),
	transporter = require('./email');

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
		res.redirect("/login?signup");
	}).catch(error => {
		console.log("ERROR: createProfile", error);
		if(error.name === "SequelizeUniqueConstraintError")
			res.redirect("/signup?email");
		else
			res.redirect("signup?error");
			//res.json(error);
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
		models.Emaillist.findAll({
			include: [{
				model: models.Facilitator,
				include: models.User
			}],
			raw: true
		},)
		.then(results => {
			results.forEach(facilitator => {
				let firstName = facilitator['facilitator.user.firstName'];
				let lastName = facilitator['facilitator.user.lastName'];
				let email = facilitator['facilitator.user.email'];
				var mailOptions={
					from: '"ASIE DB Team" <0lime.box0@gmail.com>',
					to: `"${firstName} ${lastName}", ${email}`,
					subject: 'New Employer from ASIE Resume Database', 
					text: `Hello, ${firstName} ${lastName}.\n`
						+ `A new employer has been registered onto the resume database.\n`
						+ `Here is a copy of the message\n`
						+ `--------------------------------------\n`
						+ `FROM: ${req.body.firstName} ${req.body.lastName}, <${req.body.email}>\n`
						+ `SUBJECT: ${req.body.subject}\n`
						+ `MESSAGE:\n`
						+ `${req.body.message}`
				};
				transporter.sendMail(mailOptions, (error, info) =>{});
			})
		})
	}).catch(error => {
		console.log("ERROR: createEmployer", error);
		res.redirect("/contactus?error");
		//res.json(error);
	});
});

router.use('/api', api);

module.exports = router;