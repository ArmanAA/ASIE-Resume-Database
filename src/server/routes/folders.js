let models = require("../models"),
  multer = require('multer'),
  express = require("express"),
  router = express.Router();

router.get("/", (req, res) => {
  models.Folder.findAll({
    where: {
      userId: 1//req.user.id
    },
    include: [{
      model: models.Folderentry,
      include: [{
        model: models.Candidate,
        include: [models.User]
      }]
    }]
  }).then(folders => {
    //res.json(folders);
    let results = [];
    if(folders) {
      results = folders.map(folder => {
        let folder_entrys = folder.folderentries.map(entry => {
          return {
            userId: entry.candidateId,
            profilepic: entry.candidate.profilepic,
            firstName: entry.candidate.user.firstName,
            lastName: entry.candidate.user.lastName,
            email: entry.candidate.user.email
          }
        });
        return {
          name: folder.name,
          entry: folder_entrys
        }
      });
    }
    res.json(results);
  }).catch(error => {
    res.json(error);
  });
});

router.post("/create", multer().array(), (req, res) => {
  models.Folder.upsert({
    userId: req.user.id,
    name: req.body.folderName
  }).then(result => {
    // res.json(folder);
    res.json({ message: "success" });
  }).catch(error => {
    res.json({message: "failed"});
  });
});

// router.post("/:facilitator_id/remove", (req, res) => {
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