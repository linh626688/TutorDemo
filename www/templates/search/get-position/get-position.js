/**
 * Created by DangThanhLinh on 03/04/2017.
 */
angular.module('app')
  .controller('GetCurrent', function ($scope, $cordovaGeolocation) {
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
      }, function (err) {
        // error
      });
    var watchOptions = {
      timeout: 3000,
      enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function (err) {
        // error
      },
      function (position) {
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude
      });


    watch.clearWatch();
    // OR
    // $cordovaGeolocation.clearWatch(watch)
    //   .then(function (result) {
    //     // success
    //   }, function (error) {
    //     // error
    //   });
  });
