/**
 * Created by DangThanhLinh on 26/03/2017.
 */
angular.module('app')
  .factory('tutorPostService', function ($http) {
    return {
      getAllPostTutors: getAllPostTutors,
      getPostTutor: getPostTutor,
      createPostTutor: createPostTutor,
      deletePostTutor: deletePostTutor,
      editPostTutor: editPostTutor
    };
    function getAllPostTutors() {
      return $http({
          url: 'http://35.187.156.70:8080/allPostTutor',
          method: 'GET'
        }
      );
    }

    function getPostTutor(postId) {
      return $http({
        url: 'http://35.187.156.70:8080/postTutor/' + postId,
        method: 'GET'
      });
    }

    function createPostTutor(opts, token) {
      return $http({
        url: 'http://35.187.156.70:8080/createPostTutor/',
        method: 'POST',
        data: opts,
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      });
    }

    function deletePostTutor(token, postId) {
      return $http({
        url: 'http://35.187.156.70:8080/deletePostTutor/' + postId,
        method: 'DELETE',
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      });
    }

    function editPostTutor(opts, token, postId) {
      return $http({
        url: 'http://35.187.156.70:8080/editPostTutor/' + postId,
        method: 'PUT',
        data: opts,
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      });
    }
  });
