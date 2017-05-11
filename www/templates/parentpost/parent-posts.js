/**
 * Created by DangThanhLinh on 21/03/2017.
 */
angular.module('app')
  .controller('ParentPostsCtrl', function ($scope, $http, parentPostService, MotionService, $window) {
    $scope.postParents = [];
    parentPostService.getAllPostParents()
      .success(function (response) {
        $scope.postParents = response;
        console.log(response);
        MotionService.ripple();

      });
    $scope.doRefresh = function () {
      parentPostService.getAllPostParents()
        .success(function (response) {
          $scope.postParents = response;
          console.log(response);
          MotionService.ripple();
        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
    }
  });
