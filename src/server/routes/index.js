let models  = require('../models'),
	express = require('express'),
	router  = express.Router(),
	RandomPass = require('voucher-code-generator'),
	transporter = require('./email');

let api = require('./api');

router.post("/signup", (req, res) => {
	if(req.body.password.length < 8 ){
		return res.redirect('/signup?password')
	}
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


router.post('/verify/:token', (req,res)=>{
	console.log("RESET PASSWORD: ", req.params);

	if(req.body.password != req.body.confirm || req.body.password.length < 8){
		res.redirect('/verify/'+ req.params.token +'?confirmpass');
	}
	else{
		models.User.findOne({
			where:{
				resetToken: req.params.token
			}
		}).then(user =>{
			if( user.resetExpire < Date.now() || user == null){
				res.redirect("/verify/"+req.params.token+"?timeout");
			}else{
				console.log(req.body);
				user.update({
					resetToken: null,
					resetExpire: Date.now(),	
					password: req.body.password
				})
				res.redirect("/verify/"+req.params.token+"?success");

			}
		}).catch(error=>{
			res.redirect("/verify/"+req.params.token+"?invalid");

		})
	}
})


router.post('/forgot', (req,res)=>{
	var email = req.body.email.trim();
	console.log(req.headers.origin);
	models.User.findOne({
		where:{
			email: email
		}
	}).then(user=>{
		if(user == null ){
			
			res.redirect("/forgot?email");

		}else if(user.resetExpire > Date.now() ){
		
			res.redirect("/forgot?timeout");
		
		}
		else{
			var verify = RandomPass.generate({length: 20, count: 1});
			var mailOptions={
					from: '"ASIE DB Team" <0lime.box0@gmail.com>',
					to: `"${user.firstname} ${user.lastname}", <${user.email}>`,
					subject: 'Change password at ASIE DB Team', 
					text: `
					Hello, ${user.firstname} ${user.lastname}.

					Please follow the link below to change your password.
					This link will be valid for 30 minutes. 

					${req.headers.origin}/verify/${verify}  

					If you did not request to change the password, please disregard this message and the password will remain unchanged.


					Thank you.`
				};

			models.User.update({
				resetToken: verify[0],
				resetExpire: Date.now() + 1800000
			}, 
			{
				where:{
					id: user.id
				}
			}).then(result=>{
				transporter.sendMail(mailOptions, (error, info) =>{
					if(error){
						res.redirect("/forgot?error");
					}
					else {
						res.redirect("/forgot?success");
					}
				});
			});
		}
	}).catch(error=>{
		console.log("ERROR: password");
		res.redirect("/forgot?error");
	})
});

router.use('/api', api);

module.exports = router;