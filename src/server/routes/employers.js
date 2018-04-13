let	models = require('../models'),
	Sequelize = require('sequelize'),
	express = require('express'),
	router = express.Router();
	
const Op = Sequelize.Op;

router.get('/savedemployers/inmylist/:id', (req, res) => {
	models.Savedemployer.findOne({
		where: {
			userId: req.user.id,
			employerId: req.params.id
		},
	}).then(result => {
		if (result) {
			res.json({inMyList: true});
		} else {
			res.json({inMyList: false});
		}
	}).catch(result => {
		res.json({message: "failed"});
	});
})

router.get('/savedemployers/', (req, res) => {
	models.Savedemployer.findAll({
		where: {
			userId: req.user.id
		},
		include: [models.Employer]
	}).then(employers => {
		let results = [];
		if(employers) {
			results = employers.map(employer => {
				return {
					id: employer.employerId,
					firstName: employer.employer.firstName,
					lastName: employer.employer.lastName,
					email: employer.employer.email,
					subject: employer.employer.subject,
					message: employer.employer.message
				}
			});
		}
		res.json(results);
	}).catch(error => {
		res.json(error);
	});
})

router.post('/savedemployers/save', (req, res) => {
	models.Savedemployer.findOrCreate({
		where: {
			userId: req.user.id,
			employerId: req.body.employerId
		}
	}).spread((user, created) => {
		if(created)
			res.json({message: "successful"});
		else
			res.json({message: "failure"});
	}).catch(error => {
		res.json(error);
	})
})

router.post('/savedemployers/remove', (req, res) => {
	models.Savedemployer.destroy({
		where: {
			userId: req.user.id,
			employerId: req.body.employerId
		}
	}).then(result => {
		res.json({message: "successful"});
	}).catch(result => {
		res.json({message: "failed"});
	});
})


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