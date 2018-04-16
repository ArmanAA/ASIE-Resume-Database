let models  = require('../models'),
	auth = require('./auth'),
	multer = require('multer'),
	path = require('path'),
	crypto = require('crypto'),
	express = require('express'),
	router  = express.Router();

let profile_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../../../public/profile/')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function(err, raw) {
			if (err) return cb(err);

			cb(null, raw.toString('hex') + path.extname(file.originalname));
		});
  }
});
let profile_update = multer({
	storage: profile_storage,
	fileFilter: function (req, file, cb) {
		const allowedImagesExts = ['.jpg', '.png', '.gif', '.jpeg'];
		var ext = path.extname(file.originalname);
		cb(null, allowedImagesExts.includes(ext));
	}
});

var regions = [
		'High Desert',
		'Mountains',
		'Low Desert',
		'Southern Riverside County',
		'Riverside/Corona',
		'Western San Bernardino County',
		'San Bernardino City',
		'Eastern San Bernardino'
	];

router.get('/', function(req, res) {
	var response = [];
	for (var i=0; i<regions.length; i++) {
		var entry = {label: regions[i], value: regions[i]};
		response.push(entry);
	}
	res.json(response);
})

router.post('/create', auth.user, function(req, res) {
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
		res.json({message: "failure"});
		//res.json(error);
	});
})

router.get('/:user_id', auth.user, auth.strict, function(req, res) {
	models.Candidate.findOne({
		where: {
			id: req.params.user_id
		},
		include: [models.User]
	}).then(function(results) {
		let profile = {};
		if(results) {
			profile = {
				fname: results.user.firstName,
				lname: results.user.lastName,
				city: results.city,
				phone: results.user.phone,
				email: results.user.email,
				birthday: results.user.dob,
				regionalclient: results.regionalclient,
				rehabclient: results.rehabclient,
				conditions: [],
				profilepic: results.profilepic
			}
		}
		res.json(profile);
	});
});

router.post('/:user_id/update', auth.user, auth.strict, profile_update.single("update_image"), function(req, res) {
	req.file = req.file || {};
	let filename = req.file.filename;
	if(!req.body.update_city)
		req.body.update_city = null;
	if(req.body.update_phone === "")
		req.body.update_phone = null;
	if(req.body.update_regionalclient === "")
		req.body.update_regionalclient = null;
	if(req.body.update_rehabclient === "")
		req.body.update_rehabclient = null;
	models.Candidate.update({
		city: req.body.update_city,
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
			phone: req.body.update_phone
		}, {
			where: {
				id: req.params.user_id
			}
		}).then(user_results => {
			res.json({ message: "successful" });
		}).catch(error => {
			res.json({message: "failure"});
			//res.json(error);
		});
	}).catch(error => {
		res.json({message: "failure"});
		//res.json(error);
	});
});

module.exports = router;