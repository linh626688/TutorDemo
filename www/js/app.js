// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app.controllers', []);
angular.module('app.config', []);
angular.module('app', ['ionic', 'app.controllers', 'app.run', 'app.config', 'ionic-material', 'ngCordova', 'ngStorage', 'uiGmapgoogle-maps'])
  .config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAeVbvt3vr5Ow3u_souFU44APqH067A2ck',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
      })
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login/login.html',
            controller: 'OauthCtrl'
          }
        }
      })
      .state('app.tutor-detail', {
        url: '/tutor-detail',
        views: {
          'menuContent': {
            templateUrl: 'templates/login/tutor-login/tutor-login.html',
            controller: 'TutorUpdateCtrl'
          }
        }
      })
      .state('app.parent-detail', {
        url: '/parent-detail',
        views: {
          'menuContent': {
            templateUrl: 'templates/login/parent-login/parent-login.html',
            controller: 'ParentUpdateCtrl'
          }
        }
      })
      .state('app.register', {
        url: '/register',
        views: {
          'menuContent': {
            templateUrl: 'templates/login/register.html',
            controller: 'RegisterCtrl'
          }
        }
      })
      .state('app.search-parent', {
        url: '/search-parent',
        views: {
          'menuContent': {
            templateUrl: 'templates/search/search-parent/search-parent.html',
            controller: 'SearchParentCtrl'
          }
        }
      })
      .state('app.search-tutor', {
        url: '/search-tutor',
        views: {
          'menuContent': {
            templateUrl: 'templates/search/search-tutor/search-tutor.html',
            controller: 'SearchTutorCtrl'
          }
        }
      })
      .state('app.get-current', {
        url: '/get-current',
        views: {
          'menuContent': {
            templateUrl: 'templates/search/get-position/get-position.html',
            controller: 'GetCurrent'
          }
        }
      })
      .state('app.create-message', {
        url: '/create-message/:postId',
        views: {
          'menuContent': {
            templateUrl: 'templates/message/createmessage/create-message.html',
            controller: 'messageCreateCtrl'
          }
        }
      })
      .state('app.list-messages', {
        url: '/list-messages',
        views: {
          'menuContent': {
            templateUrl: 'templates/message/listmessage/messages.html',
            'controller': 'messagesCtrl'
          }
        }
      })
      .state('app.list-message', {
        url: '/list-messages/:messageId',
        views: {
          'menuContent': {
            templateUrl: 'templates/message/listmessage/message.html',
            controller: 'messageCtrl'
          }
        }
      })
      .state('app.tutor-posts', {
        url: '/tutor-posts',
        views: {
          'menuContent': {
            templateUrl: 'templates/tutorpost/tutorposts.html',
            controller: 'TutorPostsCtrl'
          }
        }
      })
      .state('app.tutor-post', {
        url: '/tutor-posts/:postId',
        views: {
          'menuContent': {
            templateUrl: 'templates/tutorpost/tutorpost.html',
            controller: 'TutorPostCtrl'
          }
        }
      })
      .state('app.edit-tutor-post', {
        url: '/edit-tutor-posts/:postId',
        views: {
          'menuContent': {
            templateUrl: 'templates/tutorpost/edit-tutor-post.html',
            controller: 'EditTutorPostCtrl'
          }
        }
      })
      .state('app.edit-parent-post', {
        url: '/edit-parent-posts/:postId',
        views: {
          'menuContent': {
            templateUrl: 'templates/parentpost/edit-parent-post.html',
            controller: 'EditParentPostCtrl'
          }
        }
      })
      .state('app.tutor-post-image', {
        url: '/tutor-post-image/:postId',
        views: {
          'menuContent': {
            templateUrl: 'templates/tutorpost/create-post/update-post-image.html',
            controller: 'updateTutorPost'
          }
        }
      })
      .state('app.tutors', {
        url: '/tutors',
        views: {
          'menuContent': {
            controller: 'TutorsCtrl',
            templateUrl: 'templates/user/tutor/tutors.html'
          }
        }
      })
      .state('app.tutor', {
        url: '/tutors/:tutorId',
        views: {
          'menuContent': {
            templateUrl: 'templates/user/tutor/tutor.html',
            controller: 'TutorCtrl'
          }
        }
      })
      .state('app.parents', {
        url: '/parents',
        views: {
          'menuContent': {
            controller: 'ParentsCtrl',
            templateUrl: 'templates/user/parent/parents.html'
          }
        }
      })
      .state('app.tutor-update', {
        url: '/tutor-update',
        views: {
          'menuContent': {
            templateUrl: 'templates/login/tutor-login/tutor-login.html',
            controller: 'TutorUpdateCtrl'

          }
        }
      })
      .state('app.parent-update', {
        url: '/parent-update',
        views: {
          'menuContent': {
            templateUrl: 'templates/login/parent-login/parent-login.html',
            controller: 'ParentUpdateCtrl'
          }
        }
      })
      .state('app.update-tutor-post', {
        url: '/update-tutor-post',
        views: {
          'menuContent': {
            templateUrl: 'templates/tutorpost/create-post/update-tutor-post.html',
            controller: 'updateTutorPost'
          }
        }
      })
      .state('app.update-parent-post', {
        url: '/update-parent-post',
        views: {
          'menuContent': {
            templateUrl: 'templates/parentpost/create-post/update-parent-post.html',
            controller: 'updateParentPost'
          }
        }
      })
      .state('app.parent-post', {
        url: '/parent-posts/:postId',
        views: {
          'menuContent': {
            templateUrl: 'templates/parentpost/parentpost.html',
            controller: 'ParentPostCtrl'
          }
        }
      })
      .state('app.parent-posts', {
        url: '/parent-posts',
        views: {
          'menuContent': {
            templateUrl: 'templates/parentpost/parentposts.html',
            controller: 'ParentPostsCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/tutor-posts');
  })
  .controller('AppCtrl', function ($scope, $state, $ionicHistory, $window, $ionicModal, $ionicPopover, $window, OauthService, $localStorage) {
    $scope.user = $localStorage.user;
    var template = '<ion-popover-view>' +
      '   <ion-header-bar>' +
      '       <h1 class="title">Options</h1>' +
      '   </ion-header-bar>' +
      '   <ion-content class="padding">' +
      '       <a class="item button-balanced" ng-click="homePage()"> Trang Chủ </a>' +
      '       <a class="item button-balanced" ng-click="reloadPage()"> Refresh  </a>' +
      '       <a class="item button-balanced" ng-click="logOutUser()" > Đăng Xuất </a>' +
      '   </ion-content>' +
      '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });
    $scope.closePopover = function () {
      $scope.popover.hide();
    };
    $scope.reloadPage = function () {
      $window.location.reload(true);
    };
    $scope.homePage = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.tutor-posts', {reload: true});
    };

    $scope.logOutUser = function () {
      OauthService.userLogout($localStorage.user.token)
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
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.popover.remove();
    });
  })

;
