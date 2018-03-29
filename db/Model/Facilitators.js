let Sequelize = require('sequelize'),
    sequelize = require('../sequelize'),
    User = require('./User').User,
    Nodemailer = require('nodemailer');
    RandomPass = require('voucher-code-generator');

   var attributes = {

   		lastOnline: {
   			type: Sequelize.DATE,
   			allowNull: true,
   		}

   };

   var options = {
   		omitNull: true
   };

   var Facilitators = sequelize.define('facilitators', attributes, options);

	Facilitators.belongsTo(User, { foreignKey: "id", targetKey: "id" });
	
	const Op = Sequelize.Op;

	/* Email server for development provided by Ethereal Email */
	/* All emails sent can be found in ethereal.email and logging in with credentials in auth: */
	/* Email will not be delivered to actual receiver */
	const transporter = Nodemailer.createTransport({
	    host: 'smtp.ethereal.email',
	    port: 587,
	    auth: {
	        user: 'rd4ytheijcizd2jx@ethereal.email',
	        pass: 'tjAZuVfJzUhJZxwmEF'
	    },
	     tls: {
        	rejectUnauthorized: false
    	}
	});

	/* Actual email sent using Gmail server */
	/* Use your own Gmail account, 
		Set  https://myaccount.google.com/lesssecureapps to ON*/
	/*Make sure you DON'T upload credentials to repository*/
	const gmailTransporter = Nodemailer.createTransport({
		service: 'Gmail',
		secure: false,
		auth:{
			user:'yourgmail',
			pass: 'your gmail pw'
		},
		tls:{
			rejectUnauthorized: false
		}
	});


   let createFacilitator = (req, res)=>{
   	console.log("testing email");

   	var password = RandomPass.generate({length: 8, count: 1});

  	var mailOptions={
	   	from: '"ASIE DB Team" <0lime.box0@gmail.com>',
	   	to: `"${req.body.firstname} ${req.body.lastname}", <${req.body.email}>`, 
	   	subject: 'Registration from ASIE DB Team', 
	   	text: `
	   	Hello, ${req.body.firstname} ${req.body.lastname}.
	   	You have registered as a facilitator for ASIE resume database. 
	   	Please use the below auto-generated password to sign in with this email account.
	   	
	   	 ${password}
	   	
	   	Please make sure to change the password once you log in.

	   	 Thank you.`
   };
   //Change transporterer according to which email server you're using
	   Facilitators.create(
		    {
		      user: {
		        firstName: req.body.firstname,
		        lastName: req.body.lastname,
		        email: req.body.email,
		        password: `${password}`,
		        usertype: 'FAC'
		      }
		    },
		    {
		      include: [{ model: User }]
		    }
		)
		    .then(facilitator => {
		    	console.log("THEN ENTER");
		      transporter.sendMail(mailOptions, (error, info) =>{
			   	if(error){
			   		res.sendStatus(500);
			   		return console.log(error, "EROR HERE");
			   	}
		    })
		      console.log("RES SENT HERE");
		      res.sendStatus(200);
		  })
		    .catch(error => {
		    	console.log("RES SENT CATCH ENTER");
		      //console.log("ERROR: createProfile", error);
		      res.sendStatus(500);
		      return;
		    });
   }


   let deleteFacilitator = (req, res) =>{
   		//Move to archive? 
   }

   let updateNow = (req) =>{
   	 Facilitators.update({
      lastOnline: sequelize.fn('NOW'),
    }, {where:
      {id: req.user.id}
    });

   }

	let getProfile = (req, res)=>{
		console.log("QUERY POSTED", req.body);
		var query = {
			attributes: ['lastOnline', 'createdAt'], //and employer list later
			include: [
             {model: User,
              attributes: ['firstName', 'lastName', 'id', 'email'],
              where: {
                  id: req.body.id
                }
              }
           ]
		}

		Facilitators.findAll(query).then(response=>{
			let facilitator_results = [];
		    if (response) {
		      facilitator_results = response.map(result => {
		        return {
		       	  lastOnline: result.lastOnline,
		       	  createdAt: result.createdAt,
		          id: result.user.id,
		          firstName: result.user.firstName,
		          lastName: result.user.lastName,
		          email: result.user.email
		        };
		      })
		    }
   			console.log(JSON.stringify(facilitator_results));
    		res.json(facilitator_results);
		});
	}

  module.exports.Facilitators = Facilitators;
  module.exports.getProfile = getProfile;
  module.exports.createFacilitator = createFacilitator;
 module.exports.updateNow = updateNow; 