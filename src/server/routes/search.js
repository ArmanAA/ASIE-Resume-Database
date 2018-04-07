let models  = require('../models'),
	express = require('express'),
	router  = express.Router();

let searchcandidates = require('./searchcandidates'),
	searchemployers = require('./searchemployers'),
	searchfacilitators = require('./searchfacilitators');

router.use('/candidate', searchcandidates);
router.use('/employer', searchemployers);
router.use('/facilitator', searchfacilitators);

module.exports = router;