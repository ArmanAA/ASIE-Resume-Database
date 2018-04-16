let models  = require('../models'),
	auth = require('./auth'),
	express = require('express'),
	router  = express.Router();

let candidates = require('./candidates'),
  facilitators = require('./facilitators'),
  search = require('./search'),
  emaillist = require('./emaillist.js'),
  comments = require('./comments'),
  employers = require('./employers');
  users = require('./users'),
  folders = require('./folders');

router.use('/search', auth.admin, search);
router.use('/candidates', candidates);
router.use('/facilitators', auth.admin, facilitators);
router.use('/facilitator', auth.admin, facilitators);
router.use('/comments', auth.admin, comments);
router.use('/emaillist', auth.admin, emaillist)
router.use('/employers', auth.admin, employers);
router.use('/users', users);
router.use('/folders', auth.admin, folders);

module.exports = router;