var db = require('./../db/index.js');

module.exports = {
  findOne: function(username, callback) {
    db.query('SELECT 1 FROM users WHERE name = "' + username + '"', function(error, results, fields) {
      if (error) {
        throw error;
      }
      else {
        callback(results);
      }
    });
  },

  passwordMatches: function(username, password, callback) {
    db.query('SELECT EXISTS(SELECT 1 FROM users WHERE name = "' + username + '" AND password = "' + password + '")', function(error, results, fields) {
      if (error) {
        throw error;
      }
      else {
        callback(results);
      }
    });
  },

  createUser: function(req, res, next) {
    db.query('INSERT INTO users (name, password, role) VALUES ("' + req.body.username + '", "' + req.body.password + '", ' + req.body.role + ')', function(error, results, fields) {
      if (error) {
        throw error;
      }
      else {
        res.redirect(201, '/');
      }
    });
  }
};