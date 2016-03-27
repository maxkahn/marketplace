var db = require('./../db/index.js');

module.exports = {

  getAllLots: function(req, res, next) {
    db.query('SELECT lots.id, lots.quantity, lots.price, commodities.name  FROM lots INNER JOIN commodities ON commodity = commodities.id WHERE seller = "' + req.session.passport.user[0].id + '"', function(error, results, fields) {
      if (error) {
        throw error;
      } else {
        res.status(201).send(results);
      }
    });
  },

  getAvailableLots: function(req, res, next) {
    db.query('SELECT * FROM lots WHERE commodity = ' + req.params.id, function(error, results, fields) {
      if (error) {
        throw error;
      } else {
        res.status(200).send(results);
      }
    });
  },

  createLot: function(req, res, next) {
    var quantity = req.body.quantity;
    var price = req.body.price;
    var seller = req.session.passport.user[0].id;
    var commodityName = req.body.commodity;
    db.query('SELECT EXISTS(SELECT id FROM commodities WHERE name = "' + commodityName + '"))', function(error, results, fields) {
        if (error) {
          throw error;
        } else if (results) {
          db.query('SELECT id FROM commodities WHERE name = "' + commodityName + '"', function(error, results, fields) {
            if (error) {
              throw error;
            } else {
              console.log(results);
              var commodityId = results[0];
              db.query('INSERT INTO lots (quantity, price, seller, commodity) VALUES (' + quantity + ', ' + price + ', ' + seller + ', ' + commodityId + ')', function(error, results, fields) {
                if (error) {
                  throw error;
                } else {
                  //now to update the commodities table!
                  var newAveragePrice = (totalQuantity * oldAveragePrice + quantity * price) /
                    db.query('INSERT INTO commodities (name, quantity, price) values()', function(error, results, fields) {

                    });
                  res.status(201).send(results);
                }
              });
            }
          });
          else {
            db.query('INSERT INTO commodties (name, quantity, price) VALUES (' + quantity + ', ' + price + ', "' + commodityName +'")', function(error, results, fields) {
              
            })
          }

        })
    }
  })
}
};