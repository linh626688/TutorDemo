/**
 * Created by DangThanhLinh on 08/03/2017.
 */
angular.module('app')
  .controller('TutorCtrl', function ($scope, $http, $stateParams) {
    console.log($stateParams.tutorId);
    $scope.tutor = [];
    $scope.getTutorDetail = function () {
      $http.get('http://35.187.156.70:8080/getTutor/' + $stateParams.tutorId)
        .success(function (response) {
          $scope.tutor = response;
          console.log(response)
        })
    }();
  }

  );
