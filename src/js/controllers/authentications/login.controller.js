angular
  .module('whatsOn')
  .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = [
  '$state',
  '$auth',
  'currentUserService',
  '$rootScope'
];
function loginCtrl(
  $state,
  $auth,
  currentUserService, $rootScope) {

  const vm = this;

  vm.submitForm = login;
  vm.authenticate = authenticate;

  function authenticate(provider) {
    $auth.authenticate(provider).then(res => {
      currentUserService.getUser();
      $state.go('usersShow', { id: res.data.user.id });
    });
  }

  function login() {
    $auth
      .login(vm.user)
      .then(res => {
        if (res.status === 200) {
          currentUserService.getUser();
          $state.go('filesIndex');
          $rootScope.$broadcast('displayMessage', {
            type: 'success',
            content: `Welcome back ${res.data.user.username}`
          });
        }
      })
      .catch(() => {
        $rootScope.$broadcast('displayMessage', {
          type: 'warning',
          content: 'Incorrect Credentials.'
        });
      });
  }
}
