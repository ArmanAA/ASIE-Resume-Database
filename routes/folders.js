let models = require("../models"),
  express = require("express"),
  router = express.Router();

router.post("/create", (req, res) => {
  models.Folder.Create({
    folderName: req.body.folderName,
    id: req.user.id
  }).then(result => {
    // res.json(folder);
    res.json({ message: "successful" });
  });
});

// router.post("/remove", (req, res) => {
//   models.Facilitator.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: [models.User]
//   }).then(result => {
//     let facilitator = {};
//     if (result) {
//       facilitator = {
//         lastOnline: result.lastOnline,
//         createdAt: result.createdAt,
//         id: result.user.id,
//         firstName: result.user.firstName,
//         lastName: result.user.lastName,
//         email: result.user.email
//       };
//     }

//     res.json(facilitator);
//   });
// });
module.exports = router;
