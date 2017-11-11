angular
  .module('whatsOn')
  .controller('filesIndexCtrl', filesIndexCtrl);

filesIndexCtrl.$inject = ['File'];

function filesIndexCtrl(File) {
  const vm = this;
  vm.files = File.query();
}
