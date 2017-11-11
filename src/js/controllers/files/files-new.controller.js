angular
  .module('whatsOn')
  .controller('filesNewCtrl', filesNewCtrl);

filesNewCtrl.$inject = ['File', '$state'];

function filesNewCtrl(File, $state) {
  const vm = this;
  vm.title = 'Upload File';

  vm.submit = file => {
    File
      .save(file)
      .$promise
      .then(() => {
        $state.go('filesIndex');
      });
  };
}
