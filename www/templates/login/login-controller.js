angular.module('app')
  .controller('OauthCtrl', function ($scope, $state, $q, $timeout, $window, $ionicPopup, $ionicHistory, UserService, $ionicLoading, $ionicActionSheet, OauthService, ionicMaterialInk, $localStorage) {
    $scope.loginData = [];
    $scope.User = [];
    console.log($localStorage.user);
    $scope.user = $localStorage.user;
    // This is the success callback from the login method
    var fbLoginSuccess = function (response) {
      if (!response.authResponse) {
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;

      getFacebookProfileInfo(authResponse)
        .then(function (profileInfo) {
          // For the purpose of this example I will store user data on local storage
          UserService.setUser({
            authResponse: authResponse,
            userID: profileInfo.id,
            name: profileInfo.name,
            email: profileInfo.email,
            picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
          });
          $ionicLoading.hide();
          $state.go('app.tutor-posts');
        }, function (fail) {
          // Fail get profile info
          console.log('profile info fail', fail);
        });
    };

    // This is the fail callback from the login method
    var fbLoginError = function (error) {
      console.log('fbLoginError', error);
      $ionicLoading.hide();
    };

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function (authResponse) {
      var info = $q.defer();

      facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
        function (response) {
          console.log(response);
          info.resolve(response);
        },
        function (response) {
          console.log(response);
          info.reject(response);
        }
      );
      return info.promise;
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.loginfb = function () {
      facebookConnectPlugin.getLoginStatus(function (success) {
        if (success.status === 'connected') {
          console.log('getLoginStatus', success.status);
          var user = UserService.getUser('facebook');
          if (!user.userID) {
            getFacebookProfileInfo(success.authResponse)
              .then(function (profileInfo) {
                // For the purpose of this example I will store user data on local storage
                UserService.setUser({
                  authResponse: success.authResponse,
                  userID: profileInfo.id,
                  name: profileInfo.name,
                  email: profileInfo.email,
                  picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
                });
                console.log("User FB", UserService.getUser().email);
                $scope.createUserFB();
                // $state.go('app.tutor-posts');
              }, function (fail) {
                console.log('profile info fail', fail);
              });
          } else {
            $scope.createUserFB();
            console.log("User FB", UserService.getUser().email);

            // $state.go('app.tutor-posts');
          }
        } else {
          console.log('getLoginStatus', success.status);
          $ionicLoading.show({
            template: 'Logging in...'
          });

          // Ask the permissions you need. You can learn more about
          // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
          facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
        }
      });
    };

    $scope.userfb = UserService.getUser();

    $scope.showLogOutMenu = function () {
      var hideSheet = $ionicActionSheet.show({
        destructiveText: 'Logout',
        titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
        cancelText: 'Cancel',
        cancel: function () {
        },
        buttonClicked: function (index) {
          return true;
        },
        destructiveButtonClicked: function () {
          $ionicLoading.show({
            template: 'Logging out...'
          });

          // Facebook logout
          facebookConnectPlugin.logout(function () {
              $ionicLoading.hide();
              $state.go('app.tutor-posts');
            },
            function (fail) {
              $ionicLoading.hide();
            });
        }
      });
    };
    $scope.toRegister = function () {
      $state.go('app.register');
    };
    $scope.loginUser = function () {
      $scope.input = {
        username: $scope.loginData.username,
        password: $scope.loginData.password
      };
      $scope.loading();
      OauthService.userLogin($scope.input)
        .then(
          function (response) {
            console.log("response", response);
            $scope.showPopup();
            $scope.user = response;
            $scope.saveStorage($scope.user);
            // $localStorage.user = response.data;
            // console.log("$localStorage", $localStorage.user);
            //
            // if ($localStorage.user.tutor = null) {
            //   $state.go('app.tutor-detail', {reload: true})
            // } else {
            //   $state.go('app.tutor-posts', {reload: true})
            // }
            if ($scope.user.data.role == "TUTOR") {
              $state.go('app.tutor-detail')
            } else if ($scope.user.data.role == "PARENT") {
              $state.go('app.parent-detail')
            }
            else {
              $state.go('app.tutor-posts')
            }
          }
          , function (error, data) {
            console.log(error + data)
          }
        )
    };
    $scope.saveStorage = function (data) {
      $localStorage.user = data;
      console.log($localStorage.user);
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

    $scope.createUserFB = function () {
      $scope.userfb = {
        username: 'USERFB',
        password: '123456'
      };
      OauthService.userLogin($scope.userfb)
        .then(
          function (response) {
            $scope.loading();
            console.log("response", response);
            $scope.showPopup();
            $scope.user = response;
            $scope.saveStorage($scope.user);
            $state.go('app.tutor-posts')
          }
          , function (error, data) {
            console.log(error + data)
          }
        );
    };

    $scope.logOutUser = function () {
      OauthService.userLogout($localStorage.user.data.token)
        .then(
          function () {
            $state.go('app.tutor-posts');
            $window.localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
          }, function (error) {
            console.log(error);
            $state.go('app.tutor-posts');
            $window.localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
          }
        )
    };
    $scope.reloadPage = function () {
      $window.location.reload(true)
    };
    $scope.doRefresh = function () {
      $state.go($state.current, {reload: true})
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }
  });

