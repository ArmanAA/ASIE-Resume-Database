let models  = require('../models'),
	multer = require("multer"),
	express = require('express'),
	router  = express.Router();

router.get('/:user_id', function(req, res) {
	models.Experience.findAll({
		where: {
			userId: req.params.user_id
		},
		raw: true
	}).then(function(results) {
		let experiences = [];
		if(results) {
			results.forEach((result) => {
				let title = result.title;
				let from = result.from;
				let to = result.to;
				let company = result.company;
				let currently = result.currently;
				let description = result.description;
				let id = result.id;
				let experience = {
					title: title,
					from: from,
					to: to,
					company: company,
					currently: currently,
					description: description,
					id: id
				}
				experiences.push(experience);
			})
		}
		res.json(experiences);
	});
})

router.post('/:user_id/update', multer().array(), function(req, res) {

	let currently = true;
	if (req.body.currently == 'no') {
		currently = false;
	}
	models.Experience.upsert({
		userId: req.params.user_id,
		title: req.body.title,
		from: req.body.from,
		company: req.body.company,
		to: req.body.to,
		currently: currently,
		description: req.body.description
	}).then(results => {
		res.json({ message: "successful" });
	}).catch(error => {
		res.json(error);
	});
});

router.post('/:user_id/remove', function(req, res) {
	models.Experience.destroy({
		where: {
			userId: req.params.user_id,
			id: req.body.id
		}
	}).then(results => {
		res.json({ message: "successful" });
	}).catch(error => {
		res.json(error);
	});
});

module.exports = router;