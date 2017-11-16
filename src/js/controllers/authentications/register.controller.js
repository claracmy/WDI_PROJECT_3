angular
  .module('whatsOn')
  .controller('registerCtrl', registerCtrl);

registerCtrl.$inject = ['$state', '$auth', 'currentUserService', '$scope', '$rootScope'];

function registerCtrl($state, $auth, currentUserService, $scope, $rootScope) {
  const vm = this;

  vm.submitForm = register;

  function register() {
    $auth
      .signup(vm.user)
      .then(res => {
        if(res.status === 201) {
          $auth
            .login(vm.user)
            .then(() => {
              currentUserService.getUser();
              $state.go('filesIndex');
            });
        }
      })
      .catch(() => {
        $rootScope.$broadcast('displayMessage', {
          type: 'warning',
          content: 'Incorrect Credentials, please try again.'
        });
      });
  }
}
