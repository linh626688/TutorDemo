/**
 * Created by DangThanhLinh on 15/03/2017.
 */
angular.module('app')
  .controller('TutorUpdateCtrl', function ($scope, $localStorage, $ionicLoading, $timeout, ionicMaterialInk, OauthService, $state) {
    $scope.tutorDetail = $localStorage.user.data;
    console.log($localStorage.user);
    if ($scope.tutorDetail.token != null) {
      var token = $scope.tutorDetail.token;
      var idTutor = $scope.tutorDetail.tutor.id;
      console.log(token);
      console.log(idTutor);
    }

    $scope.input = [];
    $scope.updateTutor = function () {
      var data = {
        name: $scope.input.name,
        birth: $scope.input.birth,
        currentJob: $scope.input.job,
        location: $scope.input.area
      };
      console.log(data);
      OauthService.updateTutor(token, data, idTutor)
        .then(
          function (response) {
            $scope.loading();
            $scope.showPopup();
            console.log(response);
            $state.go('app.tutor', {tutorId: idTutor})
          },
          function (error) {
            console.log(error);
          })
    };
    $scope.cancelUpdate = function () {
      $scope.loading()
      $state.go('app.tutor-posts')
    };
    $scope.loading = function () {
      $ionicLoading.show({
        template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
      });

      // For example's sake, hide the sheet after two seconds
      $timeout(function () {
        $ionicLoading.hide();
      }, 2000);
    };
    $scope.showPopup = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Cập Nhật Thành Công'
      });

      $timeout(function () {
        //ionic.material.ink.displayEffect();
        ionicMaterialInk.displayEffect();
      }, 0);
    };
  });
