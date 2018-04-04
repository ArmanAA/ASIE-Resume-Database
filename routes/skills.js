let models  = require('../models'),
	express = require('express'),
	router  = express.Router();

router.get('/:user_id', function(req, res) {
	models.Skill.findAll({
		where: {
			'userId': req.params.user_id,
		},
		raw: true
	}).then(function(results) {
		var skills = [];
		results.forEach(function(skill) {
			skills.push(skill.skills);
		})
		res.json(skills);
	});
})

router.post('/:user_id/update', function(req, res) {
	let skill = req.body.skill;
	let type = req.body.type;
	//console.log("skill:", skill);
	if(type == "add") {
		models.Skill.create({
			'userId': req.params.user_id,
			'skills': skill
		}).then(results => {
			res.json({message: 'successful'})
		}).catch(error => {
			res.json(error)
		})
	}
	else {
		models.Skill.destroy({
			where: {
				'userId': req.params.user_id,
				'skills': skill
			}
		})
	}
});

module.exports = router;