angular.module('whatsOn').factory('errorHandler', errorHandler);

errorHandler.$inject = ['$rootScope'];

function errorHandler($rootScope) {
  return {
    responseError: err => {
      $rootScope.$broadcast('error', err);
    }
  };
}
