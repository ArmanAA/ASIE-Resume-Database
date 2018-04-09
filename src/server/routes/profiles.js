let models  = require('../models'),
	multer = require('multer'),
	express = require('express'),
	router  = express.Router();

let profile_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../../../public/profile/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
});
let profile_update = multer({ storage: profile_storage });

router.get('/', function(req, res) {
	var regions = models.Candidate.rawAttributes.regions.values;
	var response = [];
	for (var i=0; i<regions.length; i++) {
		var entry = {label: regions[i], value: regions[i]};
		response.push(entry);
	}
	res.json(response);
})

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

router.post('/:user_id/update', profile_update.single("update_image"), function(req, res) {
	console.log("profiles", req.body);
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
			res.json(error);
		});
	}).catch(error => {
		res.json(error);
	});
});

module.exports = router;