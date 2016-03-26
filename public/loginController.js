angular.module('customLogin', [])
  .controller('loginController', function($scope, $state, $location, Auth) {
    $scope.signin = function() {
      Auth.setUser().then(function() {
        $location.path('/landing');
      })
      .catch(function(err) {
        throw(err);
      });
    };
  });