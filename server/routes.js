var express = require('express');
var passport = require('./passport');
var commodityController = require('./controllers/commodityController');
var lotController = require('./controllers/lotController');
var userController = require('./controllers/userController');
var bidController = require('./controllers/bidController');

module.exports = function(app, express) {

  app.get('/api/keepalive', function(req, res, next) {
    res.status(200);
  });

  app.post('/signup', function(req, res, next) {
    console.log('from signup form', req.body);
    req.body.role = req.body.mx.slice(0, 1);
    userController.createUser(req, res, next);
  });

  app.post('/login', 
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  app.get('/api/loggedin', function(req, res, next) {
    console.log('when I log in, req.user is: ', req.isAuthenticated());
    res.send(JSON.stringify(req.isAuthenticated() ? req.user : 0));
  });

  app.get('/api/commodities', commodityController.getAllCommodities);

  app.get('/api/commodities/:id', lotController.getAvailableLots);

  app.post('/bid', bidController.createBid);

  app.get('/api/seller/:seller', lotController.getAllLots);
  app.post('/api/seller/:seller', lotController.createLot);
};