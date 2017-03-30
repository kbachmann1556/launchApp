// node modules
require('dotenv').config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// start app;
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ----------------------------------------------------------------------------
// app middleware
// ----------------------------------------------------------------------------

// start session
app.use(session({
  name: "session",
  secret:"launch.app",
  resave: true,
  saveUninitialized: true
}));

// parse cookies
app.use(cookieParser("launch.app"));

// check if user is logged into session
app.use(function(req, res, next) {
  if (req.session && req.session.userSession) {
    req.userSession = req.session.userSession;
    // res.locals.userSession = req.userSession;
    next();
  } else {
    next();
  }
});

app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");   
    res.header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS");  
    res.header("Access-Control-Allow-Headers","X-Requested-With, content-type");  
    res.header("Access-Control-Allow-Credentials", true);  
    next();  
});

app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

// set base directory to public folder with client side scripts
app.use(express.static(path.join(__dirname, './public')));
console.log(path.join)

// api routes
const routes = require('./routes/index');
app.use('/', routes);

// environment variables
const port = process.env.PORT || 9000;
process.title="LaunchApp";

// start server
app.listen(port, function() {
  console.log(getTimestamp() + ': server.js listening on port '+port);
});

module.exports = app;

function getTimestamp () {
  var currentTime = new Date();
  var hour = currentTime.getHours();
  var min = currentTime.getMinutes();
  var sec = currentTime.getSeconds();
  return hour + ':' + min + ':' + sec;
}
