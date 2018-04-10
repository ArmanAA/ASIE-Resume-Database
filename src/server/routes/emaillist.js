let	models = require('../models'),
	Sequelize = require('sequelize'),
	express = require('express'),
	router = express.Router();
	
const Op = Sequelize.Op;

router.post('/add', (req, res) => {
	if(req.user && req.user.usertype === "FAC") {
		models.Emaillist.upsert({
			id: req.user.id
		});
	}
	else {
		res.json({message: "Not authorized"});
	}
});

router.post('/remove', (req, res) => {
	if(req.user && req.user.usertype === "FAC") {
		models.Emaillist.destroy({
			id: req.user.id
		});
	}
	else {
		res.json({message: "Not authorized"});
	}
});

module.exports = router;