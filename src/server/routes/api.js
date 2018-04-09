let models  = require('../models'),
	express = require('express'),
	router  = express.Router();

let candidates = require('./candidates'),
  facilitators = require('./facilitators'),
  search = require('./search'),
  emaillist = require('./emaillist.js'),
  comments = require('./comments'),
  employers = require('./employers');

router.use('/search', search);
router.use('/candidates', candidates);
router.use('/facilitators', facilitators);
router.use('/comments', comments);
router.use('/emaillist', emaillist)
router.use('/employers', employers);

module.exports = router;