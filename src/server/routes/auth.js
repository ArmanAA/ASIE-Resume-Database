module.exports.admin = (req, res, next) => {
	if(!req.isAuthenticated()) {
		// denied. redirect to login
		console.log("not authorized as ADMIN", req.originalUrl);
		res.redirect("/login");
	}

	let usertype = req.user.usertype || "";
	let is_admin = ['SUPER', 'ADMIN', 'FAC'].indexOf(usertype) > -1;
	//console.log("AUTH", req.user);
	//ADMIN auth given to FAC for dev; Change to ADMIN later
	if (is_admin) {
		// req.user is available for use here
		console.log("authorized ADMIN", req.originalUrl);
		return next();
	}

	// denied. redirect to login
	console.log("not authorized as ADMIN", req.originalUrl);
	res.redirect("/login");
}

module.exports.user = (req, res, next) => {
	if (req.isAuthenticated()) {
		// req.user is available for use here

		console.log("authorized", req.originalUrl);
		return next();
	}

	// denied. redirect to login
	console.log("not authorized", req.originalUrl);
	res.redirect("/login");
}