let RandomPass = require('voucher-code-generator'),
	models = require('../models'),
	transporter = require('./email'),
	Sequelize = require('sequelize'),
	express = require('express'),
	router = express.Router();
	
const Op = Sequelize.Op;

router.get('/profile/:id', (req, res) => {
	//Change to only admin at production
	if(req.user && req.user.usertype === "FAC" ){
		models.Facilitator.findOne({
			where: {
				id: req.params.id
			},
			include: [models.User]
		}).then((result) => {
			let facilitator = {};
			if(result != null) {
				facilitator = {
					lastOnline: result.lastOnline,
					createdAt: result.createdAt,
					id: result.user.id,
					firstName: result.user.firstName,
					lastName: result.user.lastName,
					email: result.user.email
				}
				res.json(facilitator);
			}
			
		})}else{
			res.json({message: "Not Authorized"});
		}
});

router.get('/match/:id', (req,res)=>{
	if(req.user && req.user.usertype === "FAC" ){
		models.Match.findAll({
			where:{
				facilitatorId: req.params.id,
			},
			
			include:[
				{
					model: models.Candidate,
					include: [models.User]
				}, 
				models.Employer
			]
			
		}).then(result=>{
			var matches = result.map((item)=> {
				return {candidate: {
					id: item.candidate.id,
					email: item.candidate.user.email,
					name: item.candidate.user.firstName + ' ' + item.candidate.user.lastName
				}, employer: {
					id: item.employer.id,
					email: item.employer.email,
					name: item.employer.firstName + ' ' + item.employer.lastName
				},
					date: item.createdAt
			}
			});
			res.json(matches);
		})
	}else{
		res.json({message: "Not Authorized"});
	}
});

router.post('/create', (req, res) => {
	//ADD USER AUTH
	if(req.user && req.user.usertype === "FAC"){
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
					models.User.destroy({
						where: {
							id: facilitator.id
						}
					});
					facilitator.destroy();
					res.sendStatus(500);
					return console.log(error, "EROR HERE");
				}
				else {
					models.Emaillist.upsert({
						id: facilitator.id
					});
				}
			});
			console.log("RES SENT HERE");
			res.sendStatus(200);
		}).catch(error => {
			console.log("RES SENT CATCH ENTER");
			//console.log("ERROR: createProfile", error);
			res.sendStatus(500);
			return;
		});}
});



router.post('/delete', (req, res) => {
	//ADD USER AUTH
	if(req.user && req.user.usertype === "FAC"){
		var keys = Object.keys(req.body);
		const Ids = keys.filter( key => req.body[key]);
		const IdsParsed = Ids.map(val => parseInt(val));
		
		models.Facilitator.destroy({
			where: { 
				id: IdsParsed
			}
		}).then(facilitator =>{
			models.User.update(
			{
				isArchived: true
			},
			{
				where: {
					id: IdsParsed
				}
			}
			);
		}).catch(error=>{
			console.log("ERROR @ ARCHIVE", error);
			return res.sendStatus(500);
		});
		
	
		res.sendStatus(200);}
});

module.exports = router;