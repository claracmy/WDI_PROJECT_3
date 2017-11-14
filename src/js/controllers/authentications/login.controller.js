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
  vm.authenticate = authenticate;

  function authenticate(provider) {
    $auth
      .authenticate(provider)
      .then(res => {
        currentUserService.getUser();
        $state.go('usersShow', { id: res.data.user.id });
      });
  }

  function login() {
    $auth
      .login(vm.user)
      .then(res => {
        currentUserService.getUser();
        $state.go('usersShow', { id: res.data.user.id });
      });
  }
}
