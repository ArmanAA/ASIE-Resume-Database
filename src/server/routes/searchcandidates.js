let models  = require('../models'),
	Sequelize = require('sequelize'),
	express = require('express'),
	router  = express.Router();

const Op = Sequelize.Op;

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
	];

var preset_locations = [
		'High Desert',
		'Mountains',
		'Low Desert',
		'Southern Riverside County',
		'Riverside/Corona',
		'Western San Bernardino County',
		'San Bernardino City',
		'Eastern San Bernardino'
	];

router.get('/options', (req, res) => {
	var responseInterests = [];
	var responseLocations = [];
	for (var i=0; i<preset_interests.length; i++) {
		var entry = {label: preset_interests[i], value: preset_interests[i]};
		responseInterests.push(entry);
	}
	for (var i=0; i<preset_locations.length; i++) {
		var entry = {label: preset_locations[i], value: preset_locations[i]};
		responseLocations.push(entry);
	}
	res.json({
		interests: responseInterests,
		locations: responseLocations
	});
});

router.get('/match/:id', (req, res) => {
	let interest = [];
	if(req.query.interests)
		interest = req.query.interests.split(" ").filter(entry => {return entry});//[{interest: "accounting"}, {interest: "administration"}];//req.body.interest;
	let interest_obj = interest.map(interest => {
		return {interest: {[Op.iLike]: "%" + interest + "%"}}
	});
	let location = req.query.locations;
	if(location === "")
		location = null;
	else
		location = "%" + location + "%";
	if(interest_obj.length == 0)
		interest_obj = null;
	searchInterest(interest_obj, location, req.params.id, results => {
		//res.json(results);
		let candidates_results = [];
		if (results) {
			candidates_results = results.map(result => {
				return {
					firstName: result.user.firstName,
					lastName: result.user.lastName,
					profilepic: result.profilepic,
					email: result.user.email,
					userId: result.user.id,
					matched: result.matches.length > 0 ? true : false
				}
			})
		}
		res.json(candidates_results);
	});
});


router.get('/', (req, res) => {
	let interest = [];
	if(req.query.interests)
		interest = req.query.interests.split(" ").filter(entry => {return entry});//[{interest: "accounting"}, {interest: "administration"}];//req.body.interest;
	let interest_obj = interest.map(interest => {
		return {interest: {[Op.iLike]: "%" + interest + "%"}}
	});
	let location = req.query.locations;
	if(location === "")
		location = null;
	else
		location = "%" + location + "%";
	if(interest_obj.length == 0)
		interest_obj = null;
	searchInterest(interest_obj, location, null, results => {
		let candidates_results = [];
		if (results) {
			candidates_results = results.map(result => {
				return {
					firstName: result.user.firstName,
					lastName: result.user.lastName,
					profilepic: result.profilepic,
					email: result.user.email,
					userId: result.user.id
				}
			})
		}
		res.json(candidates_results);
	});
});

let searchInterest = (interest, location, id, next) => {
	let query = {
		include: [
			{
				model: models.User
			}
		]
	};
	if (id) {
		query.include = [
			{
				model: models.User
			},
			{
				model: models.Match,
				where: {
					employerId: id
				},
				required: false
			}
		]
	}
	if(location) {
		query.where = {
			city: {
				[Op.iLike]: location
			}
		}
	}
	if(interest) {
		query.include.push({
			model: models.Interest,
			where: {
				[Op.or]: interest
			}
		});
	}
	models.Candidate.findAll(query).then(next);
}

module.exports = router;