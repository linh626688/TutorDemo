/**
 * Created by DangThanhLinh on 04/03/2017.
 */
angular.module('app')
  .controller('ParentPostCtrl', function ($scope,$state,$localStorage,$stateParams,parentPostService) {
    $scope.postDetail =[];
    $scope.user = $localStorage.user;
    if ($scope.user != null) {
      $scope.tokenParent = $localStorage.user.data.token;
    }
    parentPostService.getPostParent($stateParams.postId)
      .success(function (response) {
        $scope.postDetail = response;
        console.log(response)
      });
    $scope.updatePostParent = function () {
      $state.go('app.edit-parent-post', {postId: $stateParams.postId}, {reload: true});

    };
    $scope.deletePostParent = function () {
      // parentPostService.deletePostParent(token, postId)
      $state.go('app.parent-posts', {reload: true});
      parentPostService.deletePostParent($scope.tokenParent, $stateParams.postId)
        .then(function (response) {
            console.log(response);
          }, function (error) {
            console.log(error)
          }
        );

    }
  });
