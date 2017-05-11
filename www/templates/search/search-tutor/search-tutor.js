/**
 * Created by DangThanhLinh on 01/04/2017.
 */
angular.module('app')
  .controller('SearchTutorCtrl', function ($scope, $state, $stateParams, parentPostService, MotionService, $timeout, SearchTutorService, $cordovaGeolocation) {
    var allPostParentGPS = [];
    var listResponseParent = [];
    var listMarkerParent = [];
    $scope.resultPosts = [];
    $scope.input = [];
    $scope.coor = {
      lat: '',
      lng: ''
    };

    parentPostService.getAllPostParents()
      .then(function (response) {
        listResponseParent = response.data;
        console.log(listResponseParent);
        $scope.adddata();
      });

    $scope.adddata = function () {
      for (var i = 0; i < listResponseParent.length; i++) {
        allPostParentGPS.push({
          id: listResponseParent[i].id,
          lat: listResponseParent[i].lat,
          lng: listResponseParent[i].lng
        });
      }
      console.log(allPostParentGPS);
      for (var j = 0; j < allPostParentGPS.length; j++) {
        var markerParent = {
          id: allPostParentGPS[j].id,
          coords: {
            latitude: allPostParentGPS[j].lat,
            longitude: allPostParentGPS[j].lng
          },
          options: {
            draggable: false,
            icon: 'img/Classroom-24.png'
          }
        };
        listMarkerParent.push(markerParent);
      }
      console.log(listMarkerParent);
    };


    $scope.distances = [
      {name: "5KM", value: 5000},
      {name: "10KM", value: 10000},
      {name: "15KM", value: 15000},
      {name: "20KM", value: 20000}
    ];
    $scope.searchTutor = function () {
      $scope.data = {
        location: $scope.input.location
      };
      console.log('Location', $scope.data.location);
      console.log('Distance', $scope.input.distance);
      SearchTutorService.searchTutorWithDistance($scope.data, $scope.input.distance)
        .then(
          function (response) {
            $scope.resultPosts = response;
            console.log($scope.resultPosts)
          },
          function (error, data) {
            console.log("resquest error")
          })
    };
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        $scope.lat = position.coords.latitude;
        $scope.coor.lat = parseFloat(position.coords.latitude);
        $scope.long = position.coords.longitude;
        $scope.coor.lng = parseFloat(position.coords.longitude);

      }, function (err) {
        // error
      });
    $scope.map = {
      zoom: 14,
      bounds: {},
      center: {latitude: 21.0330205, longitude: 105.8049613},
      markers: listMarkerParent
    };
    // get position of user and then set the center of the map to that position
    $cordovaGeolocation
      .getCurrentPosition()
      .then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        $scope.map = {center: {latitude: lat, longitude: long}, zoom: 16};
        $scope.marker = {
          id: 0,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
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
      });

    $scope.searchCurrentParrentLocation = function () {
      SearchTutorService.searchTutorWithLatLong($scope.coor, $scope.input.distance)
        .then(
          function (response) {
            $scope.resultPosts = response;
            console.log(response);
            MotionService.ripple();

          },
          function (error, data) {
            console.log("resquest error")
          })
    };
    $scope.doRefresh = function () {
      $state.reload();
      $timeout(function () {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.refreshComplete');
      }, 1250);
    }

  });
