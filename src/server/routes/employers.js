let	models = require('../models'),
	Sequelize = require('sequelize'),
	express = require('express'),
	router = express.Router();
	
const Op = Sequelize.Op;


router.get('/profile/:id', (req, res) => {
  models.Employer.findOne({
    where: {
      id: req.params.id
    },
    raw: true
  }).then((result) => {
    res.json(result);
  });
});

router.post('/profile/:id/add', (req, res) => {
	models.Match.findOrCreate({
		where: {
			employerId: req.params.id,
			candidateId: req.body.candidateId,
			facilitatorId: req.user.id
		}
	}).spread((user, created) => {
		if(created)
			res.json({message: "successful"});
		else
			res.json({message: "failure"});
	}).catch(error => {
		res.json(error);
	})
});

router.get('/profile/:id/matches', (req, res) => {
	models.Match.findAll({
		where: {
			employerId: req.params.id
		},
		raw: true,
		include: [
			{
				model: models.Facilitator,
				include: [models.User]
			}, {
				model: models.Candidate,
				include: [models.User]
			}
		]
	}).then((results) => {
		console.log(results);
		let matches = [];
		if(results) {
			matches = results.map(result => {
				return {
					facilitator: result['facilitator.user.firstName'] + " " + result['facilitator.user.lastName'],
					candidate: {
						name: result['candidate.user.firstName'] + " " + result['candidate.user.lastName'],
						id: result['candidate.user.id']
					},
					match: result.id
				}
			})
			res.json(matches);
		}
	})
})

router.post('/profile/:id/remove', (req, res) => {
	models.Match.destroy({
		where: {
			id: req.params.id
		}
	}).then(result => {
		res.json({message: "successful"});
	}).catch(result => {
		res.json({message: "failed"});
	});
});

module.exports = router;