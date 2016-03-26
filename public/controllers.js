var marketplaceControllers = angular.module('marketplaceControllers', []);

marketplaceControllers.controller('commoditiesListCtrl', ['$scope', '$http', 
  function($scope, $http) {
    $http.get('api/commodities')
      .success(function(data) {
        $scope.commodities = data;
      });

      $scope.orderProp = 'price';
}]);

marketplaceControllers.controller('commodityDetailCtrl', ['$scope', '$http', 
  function($scope) {

  }]);

  marketplaceControllers.controller('sellerDetailCtrl', ['$scope', '$http', 
    function($scope) {

    }]);

  marketplaceControllers.controller('bidDetailCtrl', ['$scope', '$http', 
    function($scope) {

    }]);