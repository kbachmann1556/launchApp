const express = require('express');
const router = express.Router();

const RequestController = require('../controllers/RequestController.js')
const rc = new RequestController();

const authorize = require('./authorize');

// checks if user is logged in
function requireLogin (req, res, next) {
  if (!req.userSession) {
    res.redirect('/login');
  } else {
    next();
  }
};

// requires user to be logged in

// Request Controller
// router.get('/', requireLogin, function(req, res){ rc.index(req, res); });
router.get('/', function(req, res){ rc.index(req, res); });


// no login required
router.use('/authorize', authorize);
router.get('/login', function(req, res){ rc.login_page(req, res); });

module.exports = router;