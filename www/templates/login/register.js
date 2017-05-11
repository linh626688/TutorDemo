/**
 * Created by DangThanhLinh on 08/03/2017.
 */
angular.module("app")
  .controller('RegisterCtrl', function ($scope, $state, OauthService, $ionicLoading, $timeout, ionicMaterialInk) {
    $scope.input = [];
    $scope.roles = [
      {name: "Gia Sư", value: 'TUTOR'},
      {name: "Lớp Học", value: 'PARENT'}
    ];
    $scope.registerUser = function () {
      $scope.data = {
        username: $scope.input.username,
        password: $scope.input.password,
        role: $scope.input.role
      };
      OauthService.registerUser($scope.data)
        .then(
          function (response) {
            console.log(response);
            $scope.loading();
            window.alert("Đăng Ký Thành Công");
            $state.go('app.login');
          },
          function (error, data) {
            console.log(error + data);

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
        title: 'Xin chào tới TUTOR APP'
      });

      $timeout(function () {
        //ionic.material.ink.displayEffect();
        ionicMaterialInk.displayEffect();
      }, 0);
    };
  });
