angular
  .module('whatsOn')
  .controller('filesShowCtrl', filesShowCtrl);

filesShowCtrl.$inject = ['File', '$stateParams', '$state', 'currentUserService'];

function filesShowCtrl(File, $stateParams, $state, currentUserService) {
  const vm = this;
  vm.file = File.get($stateParams);
  vm.user = currentUserService.currentUser.id;
  
  vm.delete = file => {
    File
      .remove({ id: file.id })
      .$promise
      .then(() => {
        $state.go('filesIndex');
      });
  };
}
