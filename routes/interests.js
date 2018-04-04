let models  = require('../models'),
	express = require('express'),
	router  = express.Router();

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
			'userId': req.params.user_id,
			'interest': interest,
			'type': type
		}).then(results => {
			res.json({message: 'successful'})
		}).catch(error => {
			res.json(error)
		})
	}
	else {
		models.Interest.destroy({
			where: {
				'userId': req.params.user_id,
				'type': type,
				'interest': interest
			}
		})
	}
});

module.exports = router;