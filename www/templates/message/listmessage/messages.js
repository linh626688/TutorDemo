/**
 * Created by DangThanhLinh on 09/05/2017.
 */
angular.module('app')
  .controller('messagesCtrl', function ($state, $scope, $stateParams, messageService, $localStorage) {
    $scope.messageList = [];
    $scope.messageList2 = [];
    if ($localStorage.user != null) {
      $scope.tokenTutor = $localStorage.user.data.token;
    }
    messageService.getAllMessages($scope.tokenTutor)
      .then(function (response) {
          $scope.messageList = response.data;
          console.log(response);
          $scope.addListState();
        },
        function (error, data) {
          console.log(error + data)
        });
    $scope.addListState = function () {
      for (var i = 0; i < $scope.messageList.length; i++) {
        if ($scope.messageList[i].state == true)
          $scope.messageList2.push({
            id: $scope.messageList[i].id,
            contact: $scope.messageList[i].contact,
            email: $scope.messageList[i].email,
            detailRequest: $scope.messageList[i].lng,
            timeSend: $scope.messageList[i].timeSend
          });
      }
    }
  });
