let models  = require('../models'),
	auth = require('./auth'),
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
router.use('/supports', auth.user, supports);
router.use('/experiences', auth.user, experiences);
router.use('/skills', auth.user, skills);
router.use('/interests', interests);
router.use('/hours', auth.user, hours);
router.use('/transportations', auth.user, transportations);
router.use('/portfolios', auth.user, portfolios);

module.exports = router;