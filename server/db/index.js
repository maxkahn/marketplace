var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "9vypBc8aBQ5gch5a",
  database: "marketplace"
});

dbConnection.connect();

dbConnection.query('CREATE TABLE IF NOT EXISTS users (id INT auto_increment PRIMARY KEY, name VARCHAR(100), password VARCHAR(100), role VARCHAR(1))', 
  function(err, results, fields) {
  if (err) {
    throw err;
  }
  else {
        dbConnection.query('CREATE TABLE IF NOT EXISTS commodities (id INT auto_increment PRIMARY KEY, name VARCHAR(100), quantity DECIMAL(5, 2), price DECIMAL(5, 2))', 
          function(err, results, fields) {
          if (err) {
            throw err;
          }
          else {
            dbConnection.query('CREATE TABLE IF NOT EXISTS bids (id INT auto_increment PRIMARY KEY, quantity DECIMAL(5, 2), price DECIMAL(5, 2), accepted INT, buyer INT, commodity INT, FOREIGN KEY(buyer) REFERENCES users(id), FOREIGN KEY(commodity) REFERENCES commodities(id))', 
              function(err, results, fields) {
              if (err) {
                throw err;
              }
              else {
                dbConnection.query('CREATE TABLE IF NOT EXISTS lots (id INT auto_increment PRIMARY KEY, quantity DECIMAL(5, 2), price DECIMAL(5, 2), seller INT, commodity INT, FOREIGN KEY(seller) REFERENCES users(id), FOREIGN KEY(commodity) REFERENCES commodities(id))', 
                  function(err, results, fields) {
                  if (err) {
                    throw err;
                  }
                });
              }
            });
          }
        });
      }
    });

module.exports = dbConnection;