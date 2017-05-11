/**
 * Created by DangThanhLinh on 15/03/2017.
 */
angular.module('app')
  .controller('updateTutorPost', function ($state, $scope, $cordovaCamera, $localStorage, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet, tutorPostService, $stateParams) {
    $scope.image = null;
    $scope.newPost = [];
    $scope.postDetail = [];
    if ($localStorage.user != null) {
      $scope.tokenTutor = $localStorage.user.data.token;
    }
    $scope.createPostTutor = function () {
      var request = {
        subject: $scope.postDetail.subject,
        times: $scope.postDetail.times,
        salaryDesired: $scope.postDetail.salaryDesired,
        locationDesired: $scope.postDetail.locationDesired,
        about: $scope.postDetail.about,
        classLevel: $scope.postDetail.classLevel
      };
      console.log('Input', $scope.postDetail);
      tutorPostService.createPostTutor(request, $scope.tokenTutor)
        .then(
          function (response) {
            $scope.newPost = response.data;
            console.log($scope.newPost.id);
            console.log(request);
            $state.go('app.tutor-post-image', {"postId": $scope.newPost.id})
          },
          function (error, data) {
            console.log("add post err");
          })
    };
    $scope.showAlert = function (title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg
      });
    };
    $scope.loadImage = function () {
      var options = {
        title: 'Chọn Ảnh Cho Bài Đăng',
        buttonLabels: ['Chọn Ảnh Từ Thư Viện', 'Chụp Ảnh Từ Camera'],
        addCancelButtonWithLabel: 'Hủy',
        androidEnableCancelButton: true
      };
      $cordovaActionSheet.show(options).then(function (btnIndex) {
        var type = null;
        if (btnIndex === 1) {
          type = Camera.PictureSourceType.PHOTOLIBRARY;
        } else if (btnIndex === 2) {
          type = Camera.PictureSourceType.CAMERA;
        }
        if (type !== null) {
          $scope.selectPicture(type);
        }
      });
    };
    $scope.selectPicture = function (sourceType) {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function (imagePath) {
          // Grab the file name of the photo in the temporary directory
          var currentName = imagePath.replace(/^.*[\\\/]/, '');
          //Create a new name for the photo
          var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
          // If you are trying to load image from the gallery on Android we need special treatment!
          if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
            window.FilePath.resolveNativePath(imagePath, function (entry) {
                window.resolveLocalFileSystemURL(entry, success, fail);
                function fail(e) {
                  console.error('Error: ', e);
                }

                function success(fileEntry) {
                  var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                  // Only copy because of access rights
                  $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function (success) {
                    $scope.image = newFileName;
                  }, function (error) {
                    $scope.showAlert('Error', error.exception);
                  });
                };
              }
            );
          } else {
            var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            // Move the file to permanent storage
            $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
              $scope.image = newFileName;
            }, function (error) {
              $scope.showAlert('Error', error.exception);
            });
          }
        },
        function (err) {
          // Not always an error, maybe cancel was pressed...
        })
    };
    $scope.pathForImage = function (image) {
      if (image === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + image;
      }
    };
    $scope.uploadImage = function () {
      // Destination URL
      var url = "http://35.187.156.70:8080/postByTutor/update-image-post";
      // File for Upload
      var targetPath = $scope.pathForImage($scope.image);
      // File name only
      var filename = $scope.image;
      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: {'fileName': filename},
        headers: {
          'auth-token': $scope.tokenTutor,
          'postId': $scope.postDetail.id
        }
      };

      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
        $scope.showAlert('Success', 'Image upload finished.');
        $state.go('app.tutor-post', {"postId": $scope.postDetail.id})
      })
      //   .onprogress(function (progressEvent) {
      //     if (progressEvent.lengthComputable){
      //       loaddingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
      //     }else {
      //       loadingStatus.increment();
      //     }
      //
      //   })
      // ;
    };
    $scope.postDetail = [];
    tutorPostService.getPostTutor($stateParams.postId)
      .success(function (response) {
        $scope.postDetail = response;
      });
    $scope.deletePost = function () {
      tutorPostService.deletePostTutor($scope.tokenTutor, $scope.postDetail.id);
      window.alert("Hủy Bài Đăng");
      $state.go('app.tutor-posts')
    }
  });
