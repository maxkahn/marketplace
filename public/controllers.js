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
        console.log($scope.lots);
      });

      $scope.orderProp = 'price';

      $scope.commodity = currentPath[currentPath.length - 1];
  }]);

  marketplaceControllers.controller('sellerDetailCtrl', ['$scope', '$http',
    function($scope, $http) {
      $http.get('api/seller/')
        .success(function(data) {
          $scope.lots = data;
        });

        $scope.orderProp = 'price';

        $scope.post = function(newLot) {
          newLot.seller = $rootScope.user;
          $http.post('/api/seller/:seller', JSON.stringify(newLot))
            .success(function(data) {
              null;
            });
        };
        
    }]);

  marketplaceControllers.controller('bidDetailCtrl', ['$scope', '$http', 
    function($scope) {

    }]);