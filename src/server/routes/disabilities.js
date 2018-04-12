let models  = require('../models'),
	auth = require('./auth'),
	express = require('express'),
	router  = express.Router();

var disabilities = [
	'Autism',
	'Cerebral Palsy',
	'Intellectual Disability',
	'Epilepsy',
	'Developmental Disability'
];

router.get('/', function(req, res) {
	var response = [];
	for (var i=0; i<disabilities.length; i++) {
		var entry = {label: disabilities[i], value: disabilities[i]};
		response.push(entry);
	}
	res.json(response);
})

router.get('/:user_id', auth.user, function(req, res) {
	models.Disability.findAll({
		where: {
			userId: req.params.user_id,
		},
		raw: true
	}).then(function(results) {
		var disabilities = [];
		results.forEach(function(disability) {
			disabilities.push(disability.disability);
		})
		res.json(disabilities);
	});
})

router.post('/:user_id/update', auth.user, function(req, res) {
	let disability = req.body.disability;
	let type = req.body.type;
	if(type == "add") {
		models.Disability.create({
			userId: req.params.user_id,
			disability: disability
		}).then(results => {
			res.json({message: 'successful'})
		}).catch(error => {
			res.json(error)
		})
	}
	else {
		models.Disability.destroy({
			where: {
				userId: req.params.user_id,
				disability: disability
			}
		})
	}
});

module.exports = router;