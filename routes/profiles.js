let models  = require('../models'),
	express = require('express'),
	router  = express.Router();

router.post('/create', function(req, res) {
	models.Candidate.create({
		User: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		},
		profilepic: "profilepic.jpg"
	}, {
		include: [{ model: models.User }]
	}).then(candidate => {
		res.json({message: "successful"});
	}).catch(error => {
		console.log("ERROR: createProfile", error);
		res.json(error);
	});
})

router.get('/:user_id', function(req, res) {
	console.log(req.params);
	models.Candidate.findOne({
		where: {
			id: req.params.user_id
		},
		include: [models.User]
	}).then(function(results) {
		console.log(results);
		let profile = {};
		if(results) {
			profile = {
				fname: results.User.firstName,
				lname: results.User.lastName,
				street: results.street,
				city: results.city,
				state: results.state,
				zip: results.zip,
				phone: results.User.phone,
				email: results.User.email,
				birthday: results.User.dob,
				regionalclient: results.regionalclient,
				rehabclient: results.rehabclient,
				conditions: [],
				profilepic: results.profilepic
			}
		}
		res.json(profile);
	});
});

router.post('/:user_id/update', function(req, res) {
	req.file = req.file || {};
	let filename = req.file.filename;
	if(req.body.update_zip === "")
		req.body.update_zip = null;
	if(req.body.update_phone === "")
		req.body.update_phone = null;
	if(req.body.update_state === "")
		req.body.update_state = null;
	if(req.body.update_regionalclient === "")
		req.body.update_regionalclient = null;
	if(req.body.update_rehabclient === "")
		req.body.update_rehabclient = null;
	models.Candidate.update({
		street: req.body.update_street,
		city: req.body.update_city,
		state: req.body.update_state,
		zip: req.body.update_zip,
		regionalclient: req.body.update_regionalclient,
		rehabclient: req.body.update_rehabclient,
		profilepic: filename
	}, {
		where: {
			id: req.params.user_id
		}
	}).then(candidate_results => {
		models.User.update({
			firstName: req.body.update_fname,
			lastName: req.body.update_lname,
			email: req.body.update_email,
			phone: req.body.update_phone
		}, {
			where: {
				id: req.params.user_id
			}
		}).then(user_results => {
			res.json({ message: "successful" });
		}).catch(error => {
			res.json(error);
		});
	}).catch(error => {
		res.json(error);
	});
});

module.exports = router;