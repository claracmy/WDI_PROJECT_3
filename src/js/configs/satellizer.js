angular
  .module('whatsOn')
  .config(Authentication);

Authentication.$inject = [
  '$authProvider'
];
function Authentication(
  $authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl  = '/api/login';
  $authProvider.facebook({
    url: '/api/oauth/facebook',
    clientId: '133012187404801'
  });
}
