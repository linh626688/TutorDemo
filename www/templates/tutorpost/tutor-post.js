/**
 * Created by DangThanhLinh on 07/03/2017.
 */
angular.module('app')
	.controller('TutorPostCtrl', function ($scope, $state, ionicMaterialInk, $ionicPopup, $timeout, $ionicLoading, $stateParams, tutorPostService, $localStorage) {
		$scope.postDetail = [];
		$scope.isExpanded = false;

		$scope.user = $localStorage.user;
		if ($scope.user != null) {
			$scope.tokenTutor = $localStorage.user.data.token;
		}

		tutorPostService.getPostTutor($stateParams.postId)
			.success(function (response) {
				$scope.postDetail = response;
				console.log(response);
			});
		console.log($stateParams.postId);

		$scope.editPost = function () {
			$state.go('app.edit-tutor-post', {postId: $stateParams.postId}, {reload: true});
		};
		$scope.deletePost = function () {
			$state.go('app.tutor-posts', {reload: true});
			tutorPostService.deletePostTutor($scope.tokenTutor, $stateParams.postId)
				.then(function (response) {
						$scope.loading();
						console.log(response);
						$scope.showPopupDel();
					}, function (error) {
						console.log(error)
					}
				);
		};
		$scope.tocreateMessage = function () {
			$scope.loading();
			$state.go('app.create-message', {postId: $stateParams.postId});
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
		$scope.showPopupDel = function () {
			var alertPopup = $ionicPopup.alert({
				title: 'Xóa thành công'
			});

			$timeout(function () {
				//ionic.material.ink.displayEffect();
				ionicMaterialInk.displayEffect();
			}, 0);
		};
	})
;
