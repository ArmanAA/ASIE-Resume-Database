let models  = require('../models'),
	express = require('express'),
	router  = express.Router();

let candidates = require('./candidates'),
  facilitators = require('./facilitators'),
	search = require('./search'),
  comments = require('./comments');

router.use('/search', search);
router.use('/candidates', candidates);
router.use('/facilitators', facilitators);
router.use('/comments', comments);

module.exports = router;