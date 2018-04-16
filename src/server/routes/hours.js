let models  = require('../models'),
	multer = require("multer"),
	express = require('express'),
	router  = express.Router();

let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
let parts_of_day = ["morning", "afternoon", "evening"];

router.get('/:user_id', function(req, res) {
	models.Hour.findOne({
		where: {
			id: req.params.user_id
		},
		include: [models.Candidate],
		raw:true
	}).then(function(results) {
		results = results || {};
		let results_days = [];
		let results_times = [];
		let hours = results.hours;
		if(results.sunday)
			results_days.push("Sunday");
		if(results.monday)
			results_days.push("Monday");
		if(results.tuesday)
			results_days.push("Tuesday");
		if(results.wednesday)
			results_days.push("Wednesday");
		if(results.thursday)
			results_days.push("Thursday");
		if(results.friday)
			results_days.push("Friday");
		if(results.saturday)
			results_days.push("Saturday");
		if(results.morning)
			results_times.push("Morning");
		if(results.afternoon)
			results_times.push("Afternoon");
		if(results.evening)
			results_times.push("Evening");
		res.json({days: results_days, times: results_times, hours: hours});
	});
})

router.post('/:user_id/update', multer().array(), function(req, res) {
	if (!req.body.hours) {
		req.body.hours = null;
	}
	models.Hour.upsert({
		id: req.params.user_id,
		sunday: req.body.sunday != null,
		monday: req.body.monday != null,
		tuesday: req.body.tuesday != null,
		wednesday: req.body.wednesday != null,
		thursday: req.body.thursday != null,
		friday: req.body.friday != null,
		saturday: req.body.saturday != null,
		morning: req.body.morning != null,
		afternoon: req.body.afternoon != null,
		evening: req.body.evening != null,
		hours: req.body.hours
	}).then(transportation => {
		res.json({message: 'successful'})
	}).catch(error => {
		res.json(error);
	})
});

module.exports = router;