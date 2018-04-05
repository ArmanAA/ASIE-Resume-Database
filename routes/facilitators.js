let Nodemailer = require('nodemailer'),
		RandomPass = require('voucher-code-generator'),
		models = require('../models'),
		Sequelize = require('sequelize'),
		express = require('express'),
		router = express.Router();
	
const Op = Sequelize.Op;

/* Email server for development provided by Ethereal Email */
/* All emails sent can be found in ethereal.email and logging in with credentials in auth: */
/* Email will not be delivered to actual receiver */
const transporter = Nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
				user: 'rd4ytheijcizd2jx@ethereal.email',
				pass: 'tjAZuVfJzUhJZxwmEF'
		},
		tls: {
				rejectUnauthorized: false
		}
});

/* Actual email sent using Gmail server */
/* Use your own Gmail account, 
	Set  https://myaccount.google.com/lesssecureapps to ON*/
/*Make sure you DON'T upload credentials to repository*/
const gmailTransporter = Nodemailer.createTransport({
	service: 'Gmail',
	secure: false,
	auth:{
		user:'yourgmail',
		pass: 'your gmail pw'
	},
	tls:{
		rejectUnauthorized: false
	}
});

router.get('/profile/:id', (req, res) => {
	models.Facilitator.findOne({
		where: {
			id: req.params.id
		},
		include: [models.User]
	}).then((result) => {
		let facilitator = {};
		if(result) {
			facilitator = {
				lastOnline: result.lastOnline,
				createdAt: result.createdAt,
				id: result.user.id,
				firstName: result.user.firstName,
				lastName: result.user.lastName,
				email: result.user.email
			}
		}

		res.json(facilitator);
	})
});

router.post('/create', (req, res) => {
	var password = RandomPass.generate({length: 8, count: 1});
	var mailOptions={
		from: '"ASIE DB Team" <0lime.box0@gmail.com>',
		to: `"${req.body.firstname} ${req.body.lastname}", <${req.body.email}>`,
		subject: 'Registration from ASIE DB Team', 
		text: `
		Hello, ${req.body.firstname} ${req.body.lastname}.
		You have registered as a facilitator for ASIE resume database. 
		Please use the below auto-generated password to sign in with this email account.
		
		${password}
		
		Please make sure to change the password once you log in.

		Thank you.`
	};

	//Change transporterer according to which email server you're using
	console.log("body", req.body);
	models.Facilitator.create({
		user: {
			firstName: req.body.firstname,
			lastName: req.body.lastname,
			email: req.body.email,
			password: `${password}`,
			usertype: 'FAC'
		}
	},  {
		include: [models.User]
	}).then(facilitator => {
		console.log("THEN ENTER");
		transporter.sendMail(mailOptions, (error, info) =>{
			if(error){
				res.sendStatus(500);
				return console.log(error, "EROR HERE");
			}
		});
		console.log("RES SENT HERE");
		res.sendStatus(200);
	}).catch(error => {
		console.log("RES SENT CATCH ENTER");
		//console.log("ERROR: createProfile", error);
		res.sendStatus(500);
		return;
	});
});

router.get('/delete', (req, res) => {
	//Move to archive? 
});

module.exports = router;