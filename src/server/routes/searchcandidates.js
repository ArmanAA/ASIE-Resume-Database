let models  = require('../models'),
	Sequelize = require('sequelize'),
	express = require('express'),
	router  = express.Router();

const Op = Sequelize.Op;

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
	searchInterest(interest_obj, location, results => {
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

let searchInterest = (interest, location, next) => {
	let query = {
		include: [
			{
				model: models.User
			}
		]
	};
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