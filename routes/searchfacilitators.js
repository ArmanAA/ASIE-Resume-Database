let models  = require('../models'),
	Sequelize = require('sequelize'),
	express = require('express'),
	router  = express.Router();

const Op = Sequelize.Op;

router.use('/', (req, res) => {
	//parse query (trim, blankspaces)
	let user = {
		model: models.Facilitator,
		include: [{
			model: models.User
		}]
	};

	let firstName = req.query.firstName || "";
	let lastName = req.query.lastName || "";
	let email = req.query.email || "";

	let query = {
		include: [{
			model: models.User,
			attributes: ['firstName', 'lastName', 'id', 'email'],
			where: {
				firstName: {
					[Op.iLike] : `%${firstName}%`
				},
				lastName: {
					[Op.iLike] : `%${lastName}%`
				},
				email: {
					[Op.iLike] : `%${email}%`
				},
				isArchived: false
			}
		}]
	}
	
	models.Facilitator.findAll(query).then((response)=>{
		let facilitator_results = [];
		if (response) {
			facilitator_results = response.map(result => {
				return {
					id: result.id,
					firstName: result.user.firstName,
					lastName: result.user.lastName,
					email: result.user.email
				};
			});
		}
		res.json(facilitator_results);
	});
});

module.exports = router;