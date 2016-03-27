var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var db = require('./db/index.js');
var passport = require('./passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 3000;

app.set('port', port);
app.use(express.static('./../public'));
app.use(cookieParser('supersecret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes.js')(app, express);

app.listen(port, function() {
  console.log("Listening on "+ port);
});

module.exports = app;