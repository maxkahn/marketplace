var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/index.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sellerController = require('./controllers/sellerController');
var buyerController = require('./controllers/buyerController');



var app = express();
var port = process.env.PORT || 3000;

app.set('port', port);
app.use(express.static('./../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes.js')(app, express);

app.listen(port, function() {
  console.log("Listening on "+ port);
});

passport.use(new LocalStrategy(function(username, password, done) {
  sellerController.passwordMatches(username, password, function(results) {
    if (results) {
      sellerController.findOne(username, function(user) {
        var stampedUser = user;
        stampedUser.role = "seller";
        return done(null, stampedUser);
      });
    }
    else {
      buyerController.passwordMatches(username, password, function(results) {
        if (results) {
          buyerController.findOne(username, function(user) {
            var stampedUser = user;
            stampedUser.role = "buyer";
            return done(null, stampedUser);
          });
        }
        else {
          return done(null, false, {message: "Incorrect username or password"});
        }
      });
    }
  });
}));

module.exports = app;