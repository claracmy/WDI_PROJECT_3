angular
  .module('whatsOn')
  .config(Interceptor);

Interceptor.$inject = ['$httpProvider'];

function Interceptor($httpProvider) {
  $httpProvider.interceptors.push('errorHandler');
}
 
