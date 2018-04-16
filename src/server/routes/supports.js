let models  = require('../models'),
	auth = require('./auth'),
	express = require('express'),
	router  = express.Router();


router.get('/:user_id', auth.strict, function(req, res) {
	models.Support.findOne({
		where: {
			id: req.params.user_id,
		},
		raw: true
	}).then(function(results) {
		let supportContact = {};
		if(results) {
			supportContact = {
				name: results.name,
				relationship: results.relationship,
				email: results.email,
				phone: results.phone
			}
		}
		res.json(supportContact);
	});
})

router.post('/:user_id/remove', auth.strict, function(req, res) {
	models.Support.destroy({
		where: {
			id: req.params.user_id,
		}
	})
});

router.post('/:user_id/update', auth.strict, function(req, res) {
	models.Support.upsert({
		id: req.params.user_id,
		name: req.body.name,
		relationship: req.body.relationship,
		email: req.body.email,
		phone: req.body.phone
	}).then(results => {
		res.json({message: 'successful'})
	}).catch(error => {
		res.json(error)
	})
});

module.exports = router;