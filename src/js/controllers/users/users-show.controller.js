angular
  .module('whatsOn')
  .controller('usersShowCtrl', usersShowCtrl);

usersShowCtrl.$inject = [
  'User'
];
function usersShowCtrl(
  User) {
  const vm = this;

  vm.users = User.query();
}
