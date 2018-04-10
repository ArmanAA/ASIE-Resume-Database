let models  = require('../models'),
	express = require('express'),
	router  = express.Router();

let profiles = require('./profiles'),
	disabilities = require('./disabilities'),
	supports = require('./supports');
	experiences = require('./experiences'),
	skills = require('./skills'),
	interests = require('./interests'),
	hours = require('./hours'),
	transportations = require('./transportations'),
	portfolios = require('./portfolios');

router.use('/profiles', profiles);
router.use('/disabilities', disabilities);
router.use('/supports', supports);
router.use('/experiences', experiences);
router.use('/skills', skills);
router.use('/interests', interests);
router.use('/hours', hours);
router.use('/transportations', transportations);
router.use('/portfolios', portfolios);

module.exports = router;