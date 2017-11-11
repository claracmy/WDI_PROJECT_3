angular
  .module('whatsOn')
  .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = [
  '$state',
  '$auth',
  'currentUserService'
];
function loginCtrl(
  $state,
  $auth,
  currentUserService) {
  const vm = this;

  vm.submitForm = login;

  function login() {
    $auth
      .login(vm.user)
      .then(() => {
        currentUserService.getUser();
        $state.go('usersIndex');
      });
  }
}
