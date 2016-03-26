var marketplaceControllers = angular.module('marketplaceControllers', []);

marketplaceControllers.controller('commoditiesListCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $http.get('api/commodities')
      .success(function(data) {
        $scope.commodities = data;
      });

      $scope.orderProp = 'price';

      $scope.goToCommodity = function(commodity) {
        $location.path('commodities/' + commodity.id);
        $location.replace();
      };
}]);

marketplaceControllers.controller('commodityDetailCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    var currentPath = $location.path();
    currentPath = currentPath.split('/');
    $http.get('api/commodities/' + currentPath[currentPath.length - 1])
      .success(function(data) {
        $scope.lots = data;
      });

      $scope.orderProp = 'price';
  }]);

  marketplaceControllers.controller('sellerDetailCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
      var seller = $rootScope.user;
      $http.get('api/seller/:seller')
        .success(function(data) {
          $scope.lots = data;
        });

        $scope.post = function(newLot) {
          newLot.seller = $rootScope.user;
          $http.post('/api/seller/:seller', JSON.stringify(newLot))
            .success(function(data) {
              null;
            });
        };

        //whenever I click one of these table entries, I want to modify the database
        //by filling out a form with inventory and asking price
        //that sends a put request

        //I also want a new lot form, which corresponds to a POST request
    }]);

  marketplaceControllers.controller('bidDetailCtrl', ['$scope', '$http', 
    function($scope) {

    }]);