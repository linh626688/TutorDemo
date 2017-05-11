/**
 * Created by DangThanhLinh on 09/05/2017.
 */
angular.module('app')
  .controller('messageCreateCtrl', function ($state, $scope,ionicMaterialInk, $timeout, $ionicLoading, $ionicPopup, $stateParams, messageService) {
    $scope.message = [];
    $scope.sendMessage = function () {
      var data = {
        email: $scope.message.email,
        contact: $scope.message.contact,
        detailRequest: $scope.message.detailRequest
      };
      console.log('Message', data);
      messageService.sentMessage(data, $stateParams.postId)
        .then(
          function (response) {
            $scope.loading();
            console.log(response);
            $scope.showPopup();
            $state.go('app.tutor-posts')
          },
          function (error, data) {
            console.log("error " + data);
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
        title: 'Gửi Thành Công'
      });

      $timeout(function () {
        //ionic.material.ink.displayEffect();
        ionicMaterialInk.displayEffect();
      }, 0);
    };
  });
