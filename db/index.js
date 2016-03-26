var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "9vypBc8aBQ5gch5a",
  database: "marketplace"
});

dbConnection.connect();

dbConnection.query('CREATE TABLE IF NOT EXISTS sellers (id INT PRIMARY KEY, name VARCHAR(100), password VARCHAR(100))', 
  function(err, results, fields) {
  if (err) {
    throw err;
  }
  else {
    dbConnection.query('CREATE TABLE IF NOT EXISTS buyers (id INT PRIMARY KEY, name VARCHAR(100), password VARCHAR(100))', 
      function(err, results, fields) {
      if (err) {
        throw err;
      }
      else {
        dbConnection.query('CREATE TABLE IF NOT EXISTS commodities (id INT PRIMARY KEY, name VARCHAR(100), quantity DECIMAL(5, 2), price DECIMAL(5, 2))', 
          function(err, results, fields) {
          if (err) {
            throw err;
          }
          else {
            dbConnection.query('CREATE TABLE IF NOT EXISTS bids (id INT PRIMARY KEY, quantity DECIMAL(5, 2), price DECIMAL(5, 2), accepted INT, buyer INT, commodity INT, FOREIGN KEY(buyer) REFERENCES buyers(id), FOREIGN KEY(commodity) REFERENCES commodities(id))', 
              function(err, results, fields) {
              if (err) {
                throw err;
              }
              else {
                dbConnection.query('CREATE TABLE IF NOT EXISTS lots (id INT PRIMARY KEY, quantity DECIMAL(5, 2), price DECIMAL(5, 2), seller INT, commodity INT, FOREIGN KEY(seller) REFERENCES sellers(id), FOREIGN KEY(commodity) REFERENCES commodities(id))', 
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
  }
});

module.exports = dbConnection;