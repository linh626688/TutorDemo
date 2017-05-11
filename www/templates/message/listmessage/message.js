/**
 * Created by DangThanhLinh on 09/05/2017.
 */
angular.module('app')
  .controller('messageCtrl', function ($state, $scope, $ionicLoading, $timeout, $stateParams, messageService, $localStorage) {
    $scope.messageDetail = [];
    if ($localStorage.user != null) {
      $scope.tokenTutor = $localStorage.user.data.token;
    }
    $scope.statemess = [];
    messageService.getMessagesDetail($stateParams.messageId, $scope.tokenTutor)
      .then(
        function (response) {
          $scope.messageDetail = response.data;
          $scope.statemess = response.data.state;
          console.log(response)
        },
        function (error) {
          console.log(error)
        }
      );

    $scope.deleteMessage = function () {
      messageService.removeMessage($stateParams.messageId, $scope.tokenTutor)
        .then(
          function (response) {
            $scope.loading();
            $state.go('app.list-messages');
            console.log(response)
          },
          function (error) {
            console.log(error)
          }
        )
    };
    $scope.addStateMessage = function () {
      var data = {
        state: true
      };
      messageService.updateStateMessage(data, $scope.tokenTutor, $stateParams.messageId)
        .then(
          function (response) {
            $scope.loading();
            console.log(response);
            $state.go('app.list-messages', {reload: true})
          },
          function (error) {
            console.log(error)
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
  });
