angular
  .module('whatsOn')
  .controller('userShowCtrl', userShowCtrl);

userShowCtrl.$inject = ['User', '$stateParams'];
function userShowCtrl(User, $stateParams) {
  const vm = this;

  vm.user = User.get({ id: $stateParams.id });
}
