/**
 * Created by DangThanhLinh on 28/03/2017.
 */
angular.module('app')
  .controller('updateParentPost', function ($state, $scope, $stateParams, $localStorage, parentPostService) {
    $scope.postDetail = [];
    $scope.newPost = [];
    $scope.tokenParent = $localStorage.user.data.token;
    console.log('Input', $scope.postDetail);
    $scope.createPostParent = function () {
      var request = {
        subject: $scope.postDetail.subject,
        salaryDesired: $scope.postDetail.salaryDesired,
        locationDesired: $scope.postDetail.locationDesired,
        classRequirement: $scope.postDetail.classRequirement,
        times: $scope.postDetail.times,
        period : $scope.postDetail.period,
        contact : $scope.postDetail.contact,
        classLevel: $scope.postDetail.classLevel
      };
      parentPostService.createPostParent($scope.tokenParent, request)
        .then(
          function (response) {
            $scope.newPost = response.data;
            console.log($scope.newPost);
            $state.go('app.parent-post', {"postId": $scope.newPost.id})
          },
          function (error, data) {
            console.log("add post err");
          })
    }
  });
