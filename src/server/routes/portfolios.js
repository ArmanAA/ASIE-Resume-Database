let models  = require('../models'),
	URL = require('url'),
	multer = require('multer'),
	express = require('express'),
	router  = express.Router();

let image_dir = "/portfolio/";
let youtube_start = "https://img.youtube.com/vi/";
let youtube_end = "/0.jpg";
let youtube_url = "https://www.youtube.com/watch?v=";

let portfolio_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../../../public/portfolio/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
});
let portfolio_upload = multer({ storage: portfolio_storage });

router.get('/:user_id', function(req, res) {
	models.Portfolio.findAll({
		where: {
			userId: req.params.user_id,
		},
		raw: true
	}).then((results) => {
		let portfolio = [];
		results.forEach((result) => {
			let thumbnail = result.type == "picture" ? image_dir + result.url : youtube_start + result.url + youtube_end;
			let url = results.type == "picture" ? image_dir + result.url : youtube_url + result.url;
			let portfolio_elem = {
				title: result.title,
				url: url,
				thumbnail: thumbnail,
				description: result.description,
				id: result.id
			};
			portfolio.push(portfolio_elem);
		})
		res.json(portfolio);
	});
})

router.post('/:user_id/update', portfolio_upload.single("image"), function(req, res) {
	let action = 'add';//req.body.action;
	
	if(req.file) {
		var url = req.file.filename;//req.body.url;
		var type = 'picture';//req.body.type;
	}
	else {
		var type = 'video';//req.body.type;
		let url_raw = req.body.video;
		let link = URL.parse(url_raw, true);
		let query = link.query;
		var url = query.v;
	}
	let title = req.body.title;
	let description = req.body.description;

	if(action == "add") {
		models.Portfolio.create({
			userId: req.params.user_id,
			type: type,
			url: url,
			title: title,
			description: description
		}).then(results => {
			res.json({message: 'successful'})
		}).catch(error => {
			res.json(error)
		})
	}
	else {
		models.Portfolio.destroy({
			where: {
				userId: req.params.user_id,
				type: type,
				interest: interest
			}
		})
	}
});

router.post('/:user_id/remove', function(req, res) {
	models.Portfolio.destroy({
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