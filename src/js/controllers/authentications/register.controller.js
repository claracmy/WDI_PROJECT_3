angular
  .module('whatsOn')
  .controller('registerCtrl', registerCtrl);

registerCtrl.$inject = [];

function registerCtrl() {
  const vm = this;

  vm.submitForm = register;

  function register() {

  }
}
