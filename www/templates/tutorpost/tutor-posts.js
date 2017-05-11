/**
 * Created by DangThanhLinh on 04/03/2017.
 */
angular.module('app')
  .controller('TutorPostsCtrl', function ($scope,$ionicHistory, $http, tutorPostService, MotionService) {
    $ionicHistory.clearHistory();
    $scope.postTutors = [];
      tutorPostService.getAllPostTutors()
        .success(function (response) {
          $scope.postTutors = response;
          MotionService.ripple();
        });
    $scope.doRefresh = function () {
      tutorPostService.getAllPostTutors()
        .success(function (response) {
          $scope.postTutors = response;
          MotionService.ripple();
        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
    }


  });
