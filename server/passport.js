var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sellerController = require('./controllers/sellerController');
var buyerController = require('./controllers/buyerController');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
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

module.exports = passport;