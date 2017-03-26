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
	res.render('login', this.viewData);
}

RequestController.prototype.view_dashboard = function(req, res){
	this.viewData.host = "//"+req.headers.host;
	// render view
	res.render('dashboard', this.viewData);
}

module.exports = RequestController;

//  private methods