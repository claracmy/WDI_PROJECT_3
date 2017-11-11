angular
  .module('whatsOn')
  .controller('filesShowCtrl', filesShowCtrl);

filesShowCtrl.$inject = ['File', '$stateParams', '$state'];

function filesShowCtrl(File, $stateParams, $state) {
  const vm = this;
  vm.file = File.get($stateParams);

  vm.delete = file => {
    File
      .remove({ id: file.id })
      .$promise
      .then(() => {
        $state.go('filesIndex');
      });
  };
}
