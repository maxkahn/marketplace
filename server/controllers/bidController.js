var passport = require('./../passport');

module.exports = {

  createBid: function(req, res, next) {
    var bidder = req.session.passport.user;
    console.log('bidder is: ', bidder);
    res.send(200);
  }
};