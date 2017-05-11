/**
 * Created by DangThanhLinh on 15/03/2017.
 */
angular.module('app')
  .controller('ParentUpdateCtrl', function ($scope, $localStorage, OauthService, $state) {
    $scope.parentDetail = $localStorage.user;
    console.log($scope.parentDetail);
    var token = $localStorage.user.data.token;
    var idParent = $localStorage.user.data.parent.id;
    console.log(token);
    console.log(idParent);
    $scope.input = [];
    $scope.updateParent = function () {
      var data = {
        location: $scope.input.location
      };
      console.log(data);
      OauthService.updateParent(token, data, idParent)
        .then(
          function (response) {
            console.log(response);
            $state.go('app.parent-posts')
          },
          function (error) {
            console.log(error);
          })
    }
  });
