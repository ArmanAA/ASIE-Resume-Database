let models = require('../models'),
	express = require('express'),
	router = express.Router(),
	bcrypt = require("bcrypt");


router.post('/password',(req, res)=>{
	console.log(req.body);
	console.log("password api ");
	console.log(req.user);

	if(bcrypt.compareSync(req.body.old, req.user.password_digest)){
		models.User.update(
			{ password: req.body.new },
			{
			where: {
				id : req.user.id
			}
		}).then(response=> {
			console.log("Password update successful");
		}).catch(error=>{
			console.log("Password update error");
		});
		res.sendStatus(200);
	}
	
});
/*

let findByEP = (email, password, next) => {
	User.findOne({
		where: {
			'email': email,
			'password': password
		}
	}).then(function (user) {
		next(user);
	})
}

let findById = (id, next) => {
	User.findOne({
		where: {
			'id': id
		}
	}).then(function(results) {
		//console.log(results);
		next(results);
	});
}

let findByIdRes = (req, res, next) => {
	let id = req.user.id;
	findById(id, function(user) {
		res.json(user);
	})
}

let createUser = (req, res, next) => {
	User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		usertype: 'CAND',
	})
	.then(user => {
		req.session.user = user.dataValues;
		next();
	})
	.catch(error => {
		console.log("ERROR: createUser", error);
		res.json(error);
	});
}

let updateProfile = (req, res, next) => {
	let id = req.user.id;
	User.update({
		firstName: req.body.update_fname,
		lastName: req.body.update_lname
	}, {
		where: {
			'id': id
		}
	}).then(results => {
		res.json({message: 'successful'})
	}).catch(error => {
		res.json({message: 'failed'})
	})
}*/

module.exports = router;
/*module.exports.User = User;*/
/*module.exports.findByEP = findByEP;
module.exports.findById = findById;
module.exports.findByIdRes = findByIdRes;
module.exports.createUser = createUser;
module.exports.updateProfile = updateProfile;*/