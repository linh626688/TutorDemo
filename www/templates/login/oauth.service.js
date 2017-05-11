/**
 * Created by DangThanhLinh on 08/04/2017.
 */
angular.module('app')
  .factory('OauthService', function ($http) {
    return {
      registerUser: registerUser,
      userLogin: userLogin,
      userLogout: userLogout,
      addRoleUser: addRoleUser,
      updateParent: updateParent,
      updateTutor: updateTutor

    };
    function registerUser(dataUser) {
      return $http({
        url: 'http://35.187.156.70:8080/signup',
        method: 'POST',
        data: dataUser,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    function userLogin(input) {
      return $http({
        url: 'http://35.187.156.70:8080/login',
        method: 'POST',
        data: input,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    function userLogout(token) {
      return $http({
        url: 'http://35.187.156.70:8080/logout',
        method: 'POST',
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      })
    }


    function addRoleUser(token) {
      return $http({
        url: 'http://35.187.156.70:8080/logout',
        method: 'POST',
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      })
    }

    function updateParent(token, data, parentId) {
      return $http({
        url: 'http://35.187.156.70:8080/updateParent/' + parentId,
        method: 'PUT',
        data: data,
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      })
    }

    function updateTutor(token, data, tutorId) {
      return $http({
        url: 'http://35.187.156.70:8080/updateTutor/' + tutorId,
        method: 'PUT',
        data: data,
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      })
    }

  });
