/**
 * Created by DangThanhLinh on 25/04/2017.
 */
angular.module('app')
  .controller('EditTutorPostCtrl', function ($scope,$timeout, $state,ionicMaterialInk,$ionicLoading, $stateParams, tutorPostService, $localStorage) {
    $scope.postDetail = [];
    $scope.edit = [];
    $scope.tokenTutor = $localStorage.user.data.token;
    tutorPostService.getPostTutor($stateParams.postId)
      .success(function (response) {
        $scope.postDetail = response;
        console.log(response);
      });
    $scope.editPostTutor = function () {
      var request = {
        subject: $scope.edit.subject,
        times: $scope.edit.times,
        salaryDesired: $scope.edit.salaryDesired,
        locationDesired: $scope.edit.locationDesired,
        about: $scope.edit.about,
        classLevel: $scope.edit.classLevel
      };
      console.log(request);
      tutorPostService.editPostTutor(request, $scope.tokenTutor, $stateParams.postId)
        .then(
          function (response) {
            $scope.loading();
            $scope.post = response.data;
            $scope.showPopup()
            console.log(response);
            $state.go('app.tutor-post-image', {"postId": $scope.post.id});
          },
          function (error) {
            console.log(error);
          }
        )
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
        title: 'Cập nhật thành công'
      });

      $timeout(function () {
        //ionic.material.ink.displayEffect();
        ionicMaterialInk.displayEffect();
      }, 0);
    };
  });
