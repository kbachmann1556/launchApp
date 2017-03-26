"use strict"
// dependencies
const pug = require('pug');

// ----------------------------------------------------------------------------------------
// construct class
// ----------------------------------------------------------------------------------------
var RequestController = function(){
	this.viewData = {
	}
}

// ----------------------------------------------------------------------------------------
// Request controller functions
// ----------------------------------------------------------------------------------------

// public methods

// ------------------------------------------------------------------------
// base landing route for app
// ------------------------------------------------------------------------
RequestController.prototype.index = function(req, res){
	this.viewData.host = "//"+req.headers.host;
	// render view
	res.render('landing', this.viewData);
}

RequestController.prototype.login_page = function(req, res){
	console.log('why are we here??');
}

module.exports = RequestController;

//  private methods