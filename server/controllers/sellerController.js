var db = require('./../db/index.js');

module.exports = {
  findOne: function(username, callback) {
    db.query('SELECT 1 FROM sellers WHERE name = "' + username + '"', function(error, results, fields) {
      if (error) {
        throw error;
      }
      else {
        callback(results);
      }
    });
  },

  passwordMatches: function(username, password, callback) {
    db.query('SELECT EXISTS(SELECT 1 FROM sellers WHERE name = "' + username + '" AND password = "' + password + '")', function(error, results, fields) {
      if (error) {
        throw error;
      }
      else {
        callback(results);
      }
    });
  },

  createSeller: function(req, res, next) {
    db.query('INSERT INTO sellers (name, password) VALUES ("' + req.body.username + '", "' + req.body.password + '")', function(error, results, fields) {
      if (error) {
        throw error;
      }
      else {
        res.redirect(201, '/');
      }
    });
  }
};