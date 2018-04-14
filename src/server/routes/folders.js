let models = require("../models"),
	multer = require('multer'),
	express = require("express"),
	router = express.Router();

router.get("/", (req, res) => {
	models.Folder.findAll({
		where: {
			userId: req.user.id
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
						email: entry.candidate.user.email,
						entryId: entry.id
					}
				});
				return {
					name: folder.name,
					entry: folder_entrys,
					id: folder.id
				}
			});
		}
		res.json(results);
	}).catch(error => {
		res.json(error);
	});
});


router.get("/:id", (req, res) => {
	models.Folder.findAll({
		where: {
			userId: req.params.id
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
						email: entry.candidate.user.email,
						entryId: entry.id
					}
				});
				return {
					name: folder.name,
					entry: folder_entrys,
					id: folder.id
				}
			});
		}
		res.json(results);
	}).catch(error => {
		res.json(error);
	});
});


router.post("/create", multer().array(), (req, res) => {
	if (req.body.folderName) {
		models.Folder.upsert({
			userId: req.user.id,
			name: req.body.folderName
		}).then(result => {
			// res.json(folder);
			res.json({ message: "success" });
		}).catch(error => {
			res.json({message: "failed"});
		});
	}
	
});

router.post("/add", (req, res) => {
	if (req.body.folderId) {
		models.Folderentry.findOrCreate({
			where: {
				folderId: req.body.folderId,
				candidateId: req.body.candidateId
			}
		}).spread((user, created) => {
			if(created)
				res.json({message: "successful"});
			else
				res.json({message: "failure"});
		}).catch(error => {
			res.json(error);
		})
	}
});

router.post("/remove", (req, res) => {
	models.Folderentry.destroy({
		where: {
			id: req.body.entryId
		}
	}).then(result => {
		res.json({message: "successful"});
	}).catch(result => {
		res.json({message: "failed"});
	});
});

router.post("/deletefolder", (req, res) => {
	if (req.body.folderId) {
		models.Folderentry.destroy({
			where: {
				folderId: req.body.folderId
			}
		}).then(result => {
			models.Folder.destroy({
			where: {
				id: req.body.folderId
			}
			}).then(result => {
				res.json({message: "successful"});
			}).catch(result => {
				res.json({message: "failed"});
			});
		}).catch(result => {
			res.json({message: "failed"});
		});
		
	}
})

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