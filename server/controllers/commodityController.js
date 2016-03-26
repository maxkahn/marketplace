var db = require('./../db/index.js');

module.exports = {

  getAllCommodities: function(req, res, next) {
    db.query('SELECT * FROM commodities', function(error, results, fields) {
      if (error) {
        throw error;
      }
      else {
        res.status(201).send(results);
      }
    });
  }
};