var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userController = require('./controllers/userController');


passport.serializeUser(function(user, done) {
  console.log('user before serialization: ', user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
  // userController.findOne(name, function(user) {
  //   done(null, user);
  // });
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
      userController.passwordMatches(username, password, function(results) {
    if (results) {
      userController.findOne(username, function(user) {
        console.log('when I use passport, user is: ', user);
        return done(null, user);
      });
    }
    else {
      return done(null, false, {message: "Incorrect username or password"});
    }
  });
    });

}));

module.exports = passport;