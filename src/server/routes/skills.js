let models  = require('../models'),
	auth = require('./auth'),
	express = require('express'),
	router  = express.Router();

router.get('/:user_id', auth.strict, function(req, res) {
	models.Skill.findAll({
		where: {
			userId: req.params.user_id,
		},
		raw: true
	}).then(function(results) {
		var skills = [];
		results.forEach(function(skill) {
			skills.push(skill.skill);
		})
		res.json(skills);
	});
})

router.post('/:user_id/update', auth.strict, function(req, res) {
	let skill = req.body.skill;
	let type = req.body.type;
	if(type == "add") {
		models.Skill.create({
			userId: req.params.user_id,
			skill: skill
		}).then(results => {
			res.json({message: 'successful'})
		}).catch(error => {
			res.json(error)
		})
	}
	else {
		models.Skill.destroy({
			where: {
				userId: req.params.user_id,
				skill: skill
			}
		})
	}
});

module.exports = router;