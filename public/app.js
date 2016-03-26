var marketplaceApp = angular.module('marketplaceApp', [
  'ngRoute',
  'marketplaceControllers'
  ]);

marketplaceApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/commodities', {
        templateUrl: 'commodities.html',
        controller: 'commoditiesListCtrl'
      }).
      when('/commodities/:commodity', {
        templateUrl: 'commodity-detail.html',
        controller: 'commodityDetailCtrl'
      }).
      when('/seller', {
        templateUrl: 'seller-detail.html', 
        controller: 'sellerDetailCtrl'
      }).
      when('/seller/:bids', {
        templateUrl: 'bids.html',
        controller: 'bidDetailCtrl'
      }).
      otherwise({
        redirectTo: '/commodities'
      });
  }]);