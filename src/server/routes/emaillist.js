let	models = require('../models'),
	Sequelize = require('sequelize'),
	express = require('express'),
	router = express.Router();
	
const Op = Sequelize.Op;

router.post('/add', (req, res) => {
	if(req.user && req.user.usertype === "FAC") {
		models.Emaillist.upsert({
			id: req.user.id
		}).then(result=>{
			res.sendStatus(200);
		});
	}
	else {
		res.json({message: "Not authorized"});
	}
});

router.post('/remove', (req, res) => {
	if(req.user && req.user.usertype === "FAC") {
		models.Emaillist.destroy({
			where:{
				id: req.user.id
			}
		}).then(result=>{
			res.sendStatus(200);
		}).catch(error=>{
			console.log(error);
		});
	}
	else {
		res.json({message: "Not authorized"});
	}
});

router.post('/exists', (req,res)=>{
	//if(req.user && req.user.usertype === "FAC"){

		models.Emaillist.findOne({
			where:{
				id: req.user.id
			}
		}).then(user =>{
			if(user == null){
				res.json({
					subscribe:false
				});
			}else{
				res.json({
					subscribe:true
				});
			}
		}).catch(err =>{
			res.json({message: "Internal server error"});
		})
/*
	}else{
		res.json({message: "Not authorized"});
	}*/
});
module.exports = router;