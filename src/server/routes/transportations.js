let models  = require('../models'),
  multer = require("multer"),
  express = require('express'),
  router  = express.Router();

router.get('/:user_id', function(req, res) {
  models.Transportation.findOne({
    where: {
      id: req.params.user_id
    },
    include: [models.Candidate],
    raw:true
  }).then(function(results) {
    if(results) {
      var methods = [];
      if(results.car)
        methods.push("Car");
      if(results.bike)
        methods.push("Bike");
      if(results.metro)
        methods.push("Metro");
      if(results.walk)
        methods.push("Walk");
      var other = results.other;
      var distance = results.distance
    }
    
    var transportation = {
      methods: methods || [],
      other: other || "",
      distance: distance || ""
    }
    res.json(transportation);
  });
})

router.post('/:user_id/update', multer().array(), function(req, res) {
  if(req.body.distance == "")
    req.body.distance = null;
  models.Transportation.upsert({
    id: req.params.user_id,
    car: req.body.car != null,
    bike: req.body.bike != null,
    metro: req.body.metro != null,
    walk: req.body.walk != null,
    other: req.body.other,
    distance: req.body.distance
  }).then(results => {
    res.json({message: 'successful'})
  }).catch(error => {
    res.json(error)
  })
});

module.exports = router;