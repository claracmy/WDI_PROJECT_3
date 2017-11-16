angular
  .module('whatsOn')
  .controller('userEditCtrl', userEditCtrl);


userEditCtrl.$inject = ['User', '$stateParams'];
function userEditCtrl(User, $stateParams) {
  const vm = this;

  User
    .update({ id: $stateParams.id }, vm.user)
    .$promise
    .then(() => {
      vm.user = User.get({ id: $stateParams.id });
    });
}
