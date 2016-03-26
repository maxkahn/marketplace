var express = require('express');
var commodityController = require('./controllers/commodityController');
var lotController = require('./controllers/lotController');

module.exports = function(app, express) {

  app.get('/api/keepalive', function(req, res, next) {
    res.status(200);
  });

  app.get('/api/loggedin', function(req, res, next) {

  });

  app.get('/api/commodities', commodityController.getAllCommodities);

  app.get('/api/seller/:seller', lotController.getAllLots);
  app.post('/api/seller/:seller', lotController.createLot);
};