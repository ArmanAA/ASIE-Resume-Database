let Nodemailer = require('nodemailer');

let env = process.env.NODE_ENV || 'development';

/* Actual email sent using Gmail server */
/* Use your own Gmail account, 
	Set  https://myaccount.google.com/lesssecureapps to ON*/
/*Make sure you DON'T upload credentials to repository*/

const transporter_config = {
	development: {
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'rd4ytheijcizd2jx@ethereal.email',
			pass: 'tjAZuVfJzUhJZxwmEF'
		},
		tls: {
				rejectUnauthorized: false
		}
	},
	production: {
		service: 'Gmail',
		secure: false,
		auth:{
			user:'yourgmail',
			pass: 'your gmail pw'
		},
		tls:{
			rejectUnauthorized: false
		}
	}
}

const transporter = Nodemailer.createTransport(transporter_config[env]);

module.exports = transporter;