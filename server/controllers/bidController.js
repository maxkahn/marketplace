var passport = require('./../passport');
var db = require('./../db/index.js');

module.exports = {

  createBid: function(req, res, next) {
    var bidder = req.session.passport.user[0].id;
    console.log('params path: ', req.body);
    db.query('INSERT INTO bids (quantity, price, accepted, buyer, commodity) values (' + req.body.quantity + ', ' + req.body.price + ', 0, ' + bidder + ', ' + req.body.commodity + ')', 
      function(error, results, fields) {
        if (error) {
          throw error;
        }
        else {
          res.status(201).send(results);
        }
      });
  }
};