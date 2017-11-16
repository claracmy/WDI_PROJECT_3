angular.module('whatsOn').controller('registerCtrl', registerCtrl);

<<<<<<< HEAD
registerCtrl.$inject = ['$state', '$auth', 'currentUserService', '$scope', '$rootScope'];
=======
registerCtrl.$inject = [
  '$state',
  '$auth',
  'currentUserService',
  '$scope',
  '$rootScope'
];
>>>>>>> 890b2511167ff40fed8eaae416bd4cd616d0d659

function registerCtrl($state, $auth, currentUserService, $scope, $rootScope) {
  const vm = this;

  vm.submitForm = register;

  function register() {
    $auth
      .signup(vm.user)
      .then(res => {
<<<<<<< HEAD
        if(res.status === 201) {
          $auth
            .login(vm.user)
            .then(() => {
              currentUserService.getUser();
              $state.go('filesIndex');
            });
=======
        if (res.status === 201) {
          $auth.login(vm.user).then(() => {
            currentUserService.getUser();
            $state.go('filesIndex');
          });
>>>>>>> 890b2511167ff40fed8eaae416bd4cd616d0d659
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
