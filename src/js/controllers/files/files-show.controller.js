angular
  .module('whatsOn')
  .controller('filesShowCtrl', filesShowCtrl);

filesShowCtrl.$inject = ['File', '$stateParams', '$state', 'currentUserService'];

function filesShowCtrl(File, $stateParams, $state, currentUserService) {
  const vm = this;
  vm.file = File.get($stateParams);
  vm.user = currentUserService.currentUser.id;

  vm.submitComment = comment => {
    console.log('working');
    File
      .update({ id: comment.id }, comment)
      .$promise
      .then(() => {
        $state.go('filesShow', {id: vm.file.id});
      });
  };


  vm.delete = file => {
    File
      .remove({ id: file.id })
      .$promise
      .then(() => {
        $state.go('filesEdit');
      });
  };
}
