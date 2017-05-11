angular.module('app')
  .factory('messageService', function ($http) {
    return {
      sentMessage: sentMessage,
      getAllMessages: getAllMessages,
      getMessagesDetail: getMessagesDetail,
      removeMessage: removeMessage,
      updateStateMessage: updateStateMessage
    };

    function sentMessage(opts, tutorId) {
      return $http({
        url: 'http://35.187.156.70:8080/sentMessage/' + tutorId,
        method: 'POST',
        data: opts,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    function getAllMessages(token) {
      return $http({
        url: 'http://35.187.156.70:8080/getAllMessages/',
        method: 'GET',
        headers: {
          'auth-token': token
        }
      });
    }

    function getMessagesDetail(messageId, token) {
      return $http({
        url: 'http://35.187.156.70:8080/getMessagesDetail/' + messageId,
        method: 'GET',
        headers: {
          'auth-token': token
        }
      });
    }

    function removeMessage(messageId,token) {
      return $http({
        url: 'http://35.187.156.70:8080/removeMessage/' + messageId,
        method: 'DELETE',
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      });
    }

    function updateStateMessage(opts, token, messageId) {
      return $http({
        url: 'http://35.187.156.70:8080/updateStateMessage/' + messageId,
        method: 'PUT',
        data: opts,
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      });
    }
  });
