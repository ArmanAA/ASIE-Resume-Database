let models  = require('../models'),
	auth = require('./auth'),
	URL = require('url'),
	multer = require('multer'),
	path = require('path'),
	crypto = require('crypto'),
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
		crypto.randomBytes(16, function(err, raw) {
			if (err) return cb(err);

			cb(null, raw.toString('hex') + path.extname(file.originalname));
		});
	}
});
let portfolio_upload = multer({
	storage: portfolio_storage,
	fileFilter: function (req, file, cb) {
		const allowedImagesExts = ['.jpg', '.png', '.gif', '.jpeg'];
		var ext = path.extname(file.originalname);
		cb(null, allowedImagesExts.includes(ext));
	}
});

router.get('/:user_id', auth.strict, function(req, res) {
	models.Portfolio.findAll({
		where: {
			userId: req.params.user_id,
		},
		raw: true
	}).then((results) => {
		let portfolio = [];
		results.forEach((result) => {
			let thumbnail = result.type == "picture" ? image_dir + result.url : youtube_start + result.url + youtube_end;
			let url = result.type == "picture" ? image_dir + result.url : youtube_url + result.url;
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

router.post('/:user_id/update', auth.strict, portfolio_upload.single("image"), function(req, res) {
	let action = 'add';//req.body.action;
	
	if(req.file) {
		var url = req.file.filename;//req.body.url;
		var type = 'picture';//req.body.type;
	}
	else {
		var type = 'video';//req.body.type;
		var youtubeRegexp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
		let url_raw = req.body.video;
		var matches = youtubeRegexp.exec(url_raw);
		var url = matches[5];
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

router.post('/:user_id/remove', auth.strict, function(req, res) {
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