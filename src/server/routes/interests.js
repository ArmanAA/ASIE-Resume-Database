let models  = require('../models'),
	express = require('express'),
	router  = express.Router();

var preset_interests = [
		'Accounting','Administrative','Advertising','Aerospace','Agriculture','Architecture','Automotive',
		'Banking','Biotech','Business',
		'Clothing','Communications','Construction','Creative Design','Customer Service',
		'Defense',
		'Editorial',
		'Food Services',
		'Government',
		'Healthcare','Hospitality','Human Resources',
		'Information and Arts','Information Technology','Inspection and Compliance','Installations','Insurance',
		'Law Enforcement','Legal','Library','Logistics',
		'Maintenance','Management','Manufacturing',
		'Education','Engineering','Environmental','Equipment and Facilities',
		'Finance','Fishing',
		'Marketing','Media','Medical',
		'Non-Profit',
		'Packing and Processing','Painting','Personal Services','Plumbing','Printing','Project Management',
		'Quality Assurance',
		'Real Estate','Research and Development','Retail',
		'Sales','Science','Security','Social Sciences/Services','Software','Supply',
		'Telecommunications','Transportation',
		'Veterinary',
		'Warehouse','Woodwork'
	]

router.get('/', function(req, res) {
	var response = [];
	for (var i=0; i<preset_interests.length; i++) {
		var entry = {label: preset_interests[i], value: preset_interests[i]};
		response.push(entry);
	}
	res.json(response);
})

router.get('/:user_id', function(req, res) {
	models.Interest.findAll({
		where: {
			'userId': req.params.user_id,
		},
		raw: true
	}).then(function(results) {
		var personal = [];
		var career = [];
		results.forEach(function(interest) {
			if(interest.type == "personal") {
				personal.push(interest.interest);
			}
			else if(interest.type == "career") {
				career.push(interest.interest);
			}
		})
		res.json({career_interest: career, personal_interest: personal});
	});
})

router.post('/:user_id/update', function(req, res) {
	let interest = req.body.interest;
	let type = req.body.type;
	let action = req.body.action;
	if(action == "add") {
		models.Interest.create({
			userId: req.params.user_id,
			interest: interest,
			type: type
		}).then(results => {
			res.json({message: 'successful'})
		}).catch(error => {
			res.json(error)
		})
	}
	else {
		models.Interest.destroy({
			where: {
				userId: req.params.user_id,
				type: type,
				interest: interest
			}
		})
	}
});

module.exports = router;