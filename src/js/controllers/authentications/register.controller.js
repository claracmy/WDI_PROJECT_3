angular
  .module('whatsOn')
  .controller('registerCtrl', registerCtrl);

registerCtrl.$inject = ['$state', '$auth', 'currentUserService'];

function registerCtrl($state, $auth, currentUserService) {
  const vm = this;

  vm.submitForm = register;

  function register() {
    $auth
      .signup(vm.user)
      .then(() => $auth.login(vm.user))
      .then(() => {
        currentUserService.getUser();
        $state.go('usersIndex');
      });
  }
}
