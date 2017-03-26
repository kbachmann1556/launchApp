/*
 *  authorize.js
 *    Module for authorization related functionality
 *	  Identifies user, maps to a session and checks against authorized users
 *
 *  Created: kai@transform.digital
 */

 (function() {

	const express = require("express");

	const router = new express.Router();

	// const UD = require('../helpers/UserDirectory.js');
	// var ud = new UD( true);

	// const EF = require('../controllers/ErrorFetcher.js');
	// var ef = new EF( true);

	router.post('/', authorizeUser);
	router.get('/', authorizeUser);

	function authorizeUser(req, res, next) {
		// res.set('Content-Type', 'text/plain');
		var userName;
		var session_for_user = req.session.userSession;

		// var companyName = "Go.Transform.Digital";
		
		// check if post request if coming from google+ acoount
		// console.log('req.body',req.body);
		// var userInfo = null;
		// var googleUser = false;

		// check if there is a valid email address/user from google login
		if(req.body.google_user_name){
			console.log('google.user', req.body.google_user_name);
			userInfo = ud.lookupUserFromEmail( req.body.google_user_email);
			googleUser = true;
		} else {

			// process request with manually entered authorization code
			var userCode = (req.query.code) ? req.query.code : req.body.code;

			if ( userCode != null) {
				userInfo = ud.lookupUser( userCode);
			}
		}

		// Create a session object based on user information
		if ( userInfo != null) {
			if(googleUser){
				userInfo.visual.name = req.body.google_user_name;
			}
			userName = userInfo.visual.name;

			var parameters = { session_for_user};
			session_for_user = ud.addSession( userInfo, parameters);
			session_for_user.customer_obj = {};

			// set cookies and session if user is authorized
			req.session.save(function (err){
				req.session.userSession = session_for_user;
				res.send({status:"success",user:userName, obj: session_for_user});
			});
		} else {
			var error = ef.GetErrorMessage("Unauthorized User");
			res.send(error);
		}
	}

	module.exports = router;
})();