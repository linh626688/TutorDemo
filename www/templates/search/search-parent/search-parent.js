/**
 * Created by DangThanhLinh on 01/04/2017.
 */
angular.module('app')
	.controller('SearchParentCtrl', function ($scope, $timeout, ionicMaterialInk, $window, $ionicLoading, SearchParentService, tutorPostService, $cordovaGeolocation, MotionService) {
		$scope.resultPosts = [];
		$scope.resultPosts = [];
		$scope.input = [];
		var allPostTutorGPS = [];
		var listResponse = [];
		var listMarker = [];
		var lat;
		var long;

		var posOptions = {timeout: 10000, enableHighAccuracy: false};
		$cordovaGeolocation
			.getCurrentPosition(posOptions)
			.then(function (position) {
				lat = position.coords.latitude;
				$scope.coor.lat = parseFloat(position.coords.latitude);
				long = position.coords.longitude;
				$scope.coor.lng = parseFloat(position.coords.longitude);
				$window.alert(lat + ' ' + long);
			}, function (err) {
				console.log(err.message)
			});

		tutorPostService.getAllPostTutors()
			.then(function (response) {
				listResponse = response.data;
				console.log(listResponse);
				$scope.adddata();
			});

		$scope.adddata = function () {
			for (var i = 0; i < listResponse.length; i++) {
				allPostTutorGPS.push({
					id: listResponse[i].id,
					lat: listResponse[i].lat,
					lng: listResponse[i].lng
				});
			}
			console.log(allPostTutorGPS);
			for (var j = 0; j < allPostTutorGPS.length; j++) {
				var markerTutor = {
					id: allPostTutorGPS[j].id,
					coords: {
						latitude: allPostTutorGPS[j].lat,
						longitude: allPostTutorGPS[j].lng
					},
					options: {
						draggable: false,
						icon: 'img/teacher_male.png'
					}
				};
				listMarker.push(markerTutor);
			}
			var markerThis = {
				id: allPostTutorGPS.length + 1,
				coords: {
					latitude: lat,
					longitude: long
				},
				options: {draggable: false},

				events: {
					dragend: function (marker, eventName, args) {
						var lat = marker.getPosition().lat();
						var lon = marker.getPosition().lng();

						$scope.marker.options = {
							draggable: true,
							labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
							labelAnchor: "100 0",
							labelClass: "marker-labels"
						};
					}
				}
			};
			listMarker.push(markerThis);
			// window.alert(JSON.stringify(markerThis.coords));
		};


		$scope.input.distance = 10000;
		$scope.coor = {
			lat: '',
			lng: ''
		};
		$scope.distances = [
			{name: "5KM", value: 5000},
			{name: "10KM", value: 10000},
			{name: "15KM", value: 15000},
			{name: "20KM", value: 20000}
		];
		$scope.searchParent = function () {
			$scope.data = {
				location: $scope.input.location
			};
			console.log('Location', $scope.data.location);
			console.log('Distance', $scope.input.distance);
			SearchParentService.searchTutorWithDistance($scope.data, $scope.input.distance)
				.then(
					function (response) {
						$scope.loading();
						$scope.resultPosts = response;
						console.log($scope.resultPosts);
						window.alert("Có "+ $scope.resultPosts.data.length + " Kết quả ");
						MotionService.ripple();

					},
					function (error, data) {
						console.log("resquest error" + data)
					})
		};

		$scope.map = {
			zoom: 12,
			bounds: {},
			center: {latitude: 21.036561, longitude: 105.782813},
			markers: listMarker
		};
		console.log($scope.coor.lat, $scope.coor.long);


		// get position of user and then set the center of the map to that position
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
		$cordovaGeolocation
			.getCurrentPosition(posOptions)
			.then(function (position) {
				var lat = position.coords.latitude;
				var long = position.coords.longitude;
				// $scope.map = {center: {latitude: lat, longitude: long}, zoom: 16};
				// $scope.marker = {
				// 	id: 0,
				// 	coords: {
				// 		latitude: position.coords.latitude,
				// 		longitude: position.coords.longitude
				// 	},
				// 	options: {draggable: false},
				//
				// 	events: {
				// 		dragend: function (marker, eventName, args) {
				// 			var lat = marker.getPosition().lat();
				// 			var lon = marker.getPosition().lng();
				//
				// 			$scope.marker.options = {
				// 				draggable: true,
				// 				labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
				// 				labelAnchor: "100 0",
				// 				labelClass: "marker-labels"
				// 			};
				// 		}
				// 	}
				// };
			}, function (err) {
				console.log(err.message)
			});
		$scope.searchCurrentLocation = function () {
			SearchParentService.searchTutorWithCurrentLocation($scope.coor, $scope.input.distance)
				.then(
					function (response) {
						$scope.loading();
						$scope.resultPosts = response;
						console.log($scope.resultPosts);
						MotionService.ripple();
						window.alert("Có "+ $scope.resultPosts.data.length + " Kết quả ");

					},
					function (error, data) {
						console.log("resquest error")
					})

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
