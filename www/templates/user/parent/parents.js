angular.module('app')
  .controller('ParentsCtrl', function ($scope, $http) {
    $scope.parents = [];
    $scope.getAllParent = function () {
      $http.get('http://35.187.156.70:8080/getAllParent')
        .success(function (response) {
          $scope.parents = response;
          console.log(response)
        })
    }()
  });
