var express = require('express');
var passport = require('./passport');
var commodityController = require('./controllers/commodityController');
var lotController = require('./controllers/lotController');
var buyerController = require('./controllers/buyerController');
var sellerController = require('./controllers/sellerController');

module.exports = function(app, express) {

  app.get('/api/keepalive', function(req, res, next) {
    res.status(200);
  });

  app.post('/signup', function(req, res, next) {
    console.log('from signup form', req.body);
    if (req.body.mx === "Buyer") {
      buyerController.createBuyer(req, res, next);
    }
    else if (req.body.mx === "Seller") {
      sellerController.createSeller(req, res, next);
    }
    else {
      res.sendStatus(500);
    }
  });

  app.post('/login', 
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  app.get('/api/loggedin', function(req, res, next) {
    res.send(JSON.stringify(req.isAuthenticated() ? req.user : 0));
  });

  app.get('/api/commodities', commodityController.getAllCommodities);

  app.get('api/commodities/:commodity', lotController.getAvailableLots);

  app.get('/api/seller/:seller', lotController.getAllLots);
  app.post('/api/seller/:seller', lotController.createLot);
};