var marketplaceApp = angular.module('marketplaceApp', [
  'ngRoute',
  'marketplaceControllers'
  ]);

marketplaceApp.config(['$routeProvider',
  function($routeProvider) {
    var checkLoggedIn = function($q, $http, $location, $rootScope) {
      var deferred = $q.defer();

      $http.get('/api/loggedin').success(function(user) {
        if (user !== '0') {
          $rootScope.user = user;
          deferred.resolve();
        }
        else {
          deferred.reject();
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    
    $routeProvider.
      when('/commodities', {
        templateUrl: 'commodities.html',
        controller: 'commoditiesListCtrl',
        resolve: {
          loggedin: checkLoggedIn
        }
      }).
      when('/commodities/:commodity', {
        templateUrl: 'commodity-detail.html',
        controller: 'commodityDetailCtrl',
        resolve: {
          loggedin: checkLoggedIn
        }
      }).
      when('/seller', {
        templateUrl: 'seller-detail.html', 
        controller: 'sellerDetailCtrl',
        resolve: {
          loggedin: checkLoggedIn
        }
      }).
      when('/seller/:bids', {
        templateUrl: 'bids.html',
        controller: 'bidDetailCtrl'
      }).
      when('/login', {
        templateUrl: 'login.html'
      });
      // otherwise({
      //   redirectTo: '/commodities'
      // });
  }]);