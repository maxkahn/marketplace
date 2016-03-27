var db = require('./../db/index.js');

module.exports = {

  getAllLots: function(req, res, next) {
    console.log(req.params.seller);
    db.query('SELECT lots.id, lots.quantity, lots.price, commodities.name  FROM lots INNER JOIN commodities ON commodity = commodities.id WHERE seller = "' + req.params.seller + '"', function(error, results, fields) {
      if (error) {
        throw error;
      }
      else {
        res.status(201).send(results);
      }
    });
  },

  getAvailableLots: function(req, res, next) {
    console.log('I hit the available lots controller');
    console.log('from getAvailableLots, req.params.id is: ', req.params.id);
    db.query('SELECT * FROM lots WHERE commodity = ' + req.params.id, function(error, results, fields) {
      if (error) {
        throw error;
      }
      else {
        res.status(200).send(results);
      }
    });
  },

  createLot: function(req, res, next) {
    var quantity = req.body.quantity;
    var price = req.body.price;
    var seller = req.params.seller;
    var commodityName = req.body.commodity;
    db.query('SELECT id FROM commodities WHERE name = "' + commodityName + '"', function(error, results, fields) {
      if (error) {
        throw error;
      }
      else {
        console.log(results);
        var commodityId = results[0];
        db.query('INSERT INTO lots (quantity, price, seller, commodity) VALUES (' + quantity, function(error, results, fields) {
          if (error) {
            throw error;
          }
          else {
            res.status(201).send(results);
          }
        })
      }
    })
  }
};