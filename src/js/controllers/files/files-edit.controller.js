angular
  .module('whatsOn')
  .controller('filesEditCtrl', filesEditCtrl);

filesEditCtrl.$inject = ['File', '$stateParams', '$state'];

function filesEditCtrl(File, $stateParams, $state) {
  const vm = this;
  vm.title = 'Edit File';
  vm.file = File.get($stateParams);

  vm.submit = () => {
    File
      .update({ id: $stateParams.id }, vm.file)
      .$promise
      .then(() => {
        $state.go('filesShow', { id: $stateParams.id });
      });
  };
}
