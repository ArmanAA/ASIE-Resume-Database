let models  = require('../models'),
	express = require('express'),
	router  = express.Router();

let candidates = require('./candidates');

router.use('/candidates', candidates);

module.exports = router;