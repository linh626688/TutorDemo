/**
 * Created by DangThanhLinh on 26/03/2017.
 */
angular.module('app')
  .factory('parentPostService', function ($http) {

      return {
        getAllPostParents: getAllPostParent,
        getPostParent: getPostParent,
        allPostByParent: allPostByParent,
        deletePostParent: deletePostParent,
        editPostParent: editPostParent,
        createPostParent: createPostParent
      };

      function getAllPostParent() {
        return $http({
            url: 'http://35.187.156.70:8080/allPostParent',
            method: 'GET'
          }
        );
      }

      function getPostParent(postId) {
        return $http({
            url: 'http://35.187.156.70:8080/postParent/' + postId,
            method: 'GET'
          }
        );
      }

      function allPostByParent(parentId) {
        return $http({
            url: 'http://35.187.156.70:8080/allPostParent/' + parentId,
            method: 'GET'
          }
        );
      }

      function deletePostParent(token, postId) {
        return $http({
          url: 'http://35.187.156.70:8080/deletePostParent/' + postId,
          method: 'DELETE',
          headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
          }
        })
      }

      function editPostParent(token, data, postId) {
        return $http({
          url: 'http://35.187.156.70:8080/editPostParent/' + postId,
          method: 'PUT',
          data: data,
          headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
          }
        })
      }

      function createPostParent(token, data) {
        return $http({
          url: 'http://35.187.156.70:8080/createPostParent/',
          method: 'POST',
          data: data,
          headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
          }
        });
      }
    }
  );

