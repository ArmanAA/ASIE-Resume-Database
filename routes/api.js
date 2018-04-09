let models = require("../models"),
  express = require("express"),
  router = express.Router();

let candidates = require("./candidates"),
  facilitators = require("./facilitators"),
  search = require("./search"),
  folders = require("./folders"),
  comments = require("./comments");

router.use("/search", search);
router.use("/candidates", candidates);
router.use("/facilitators", facilitators);
router.use("/comments", comments);
router.use("folders", folders);

module.exports = router;
