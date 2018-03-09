let pgp = require('pg-promise')(),
    config = require('./config'),
    databaseurl = config.databaseurl,
    db = pgp(databaseurl);

exports.one = db.one;
exports.any = db.any;
exports.query = db.any;