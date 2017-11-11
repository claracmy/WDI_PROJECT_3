angular
  .module('whatsOn')
  .controller('filesNewCtrl', filesNewCtrl);

filesNewCtrl.$inject = ['File', '$state'];

function filesNewCtrl(File, $state) {
  const vm = this;
  vm.submit = file => {
    File
      .save(file)
      .$promise
      .then(() => {
        $state.go('filesIndex');
      });
  };
}
