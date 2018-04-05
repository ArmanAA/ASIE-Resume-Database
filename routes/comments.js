let models  = require('../models'),
	multer = require("multer"),
	express = require('express'),
	router  = express.Router();

router.get('/:employer_id', (req, res) => {
	models.Comment.findAll({
		where: {
			employerId: req.params.employer_id
		},
		include: [models.User]
	}).then(comments => {
		let results = [];
		if(comments) {
			results = comments.map(comment => {
				let name = comment.user.firstName +" " +
							comment.user.lastName;
				return {
					name: name,
					comment: comment.comment
				}
			})
		}
		res.json(results);
	});
})

router.post('/:employer_id/add', (req, res) => {
	if(req.body.comment) {
		models.Comment.create({
			employerId: req.params.employer_id,
			userId: req.user.id,
			comment: req.body.comment,
		}, {
			raw: true
		}).then(result => {
			let name = req.user.firstName + " " + req.user.lastName;
			res.json({
				name: name,
				comment: req.body.comment
			});
		})
	}
	else {
		res.json({message: "failed"});
	}
});

router.post('/:employer_id/delete', (req, res) => {

});

module.exports = router;