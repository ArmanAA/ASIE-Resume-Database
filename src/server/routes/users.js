let models = require('../models'),
	auth = require('./auth'),
	express = require('express'),
	router = express.Router(),
	bcrypt = require("bcrypt");

router.post('/password',auth.user, (req, res)=>{
	if(bcrypt.compareSync(req.body.old, req.user.password_digest)){
		if(req.body.new.length < 8 ){ 
			res.sendStatus(500); 
		}
		models.User.update(
			{ 
				password: req.body.new,
			 },
			{
			where: {
				id : req.user.id
			},
			individualHooks: true
		}).then(response=> {
			res.json({confirm:true});
		}).catch(error=>{
			res.sendStatus(500);
		});
		
	}else{
		res.json({confirm: false});
	}
});

router.post ('/userinfo', auth.user, (req, res)=>{
	res.send({
		email: req.user.email,
		id: req.user.id,
		firstName: req.user.firstName,
		lastName: req.user.lastName,
		usertype: req.user.usertype
	});
})

module.exports = router;