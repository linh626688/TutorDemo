/**
 * Created by DangThanhLinh on 25/04/2017.
 */
angular.module('app')
  .controller('EditParentPostCtrl', function ($state, $scope, $stateParams, $localStorage, parentPostService) {
    $scope.postDetail = [];
    $scope.input = [];
    $scope.parentToken = $localStorage.user.data.token;

    parentPostService.getPostParent($stateParams.postId)
      .success(function (response) {
        $scope.postDetail = response;
        console.log(response)
      });
    $scope.editParentPost = function () {
      var request = {
        subject: $scope.input.subject,
        salaryDesired: $scope.input.salaryDesired,
        locationDesired: $scope.input.locationDesired,
        classRequirement: $scope.input.classRequirement,
        times: $scope.input.times,
        period: $scope.input.period,
        contact: $scope.input.contact,
        classLevel: $scope.input.classLevel
      };
      parentPostService.editPostParent($scope.parentToken, request, $stateParams.postId)
        .then(
          function (response) {
            $scope.post = response.data;
            console.log(response);
            $state.go('app.parent-post', {"postId": $scope.post.id});
          }, function (error) {
            console.log(error)
          }
        )
    }
  });

