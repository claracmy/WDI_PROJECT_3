angular
  .module('whatsOn')
  .controller('filesShowCtrl', filesShowCtrl);

filesShowCtrl.$inject = ['File', '$stateParams', '$state'];

function filesShowCtrl(File, $stateParams, $state) {
  const vm = this;
  vm.file = File.get($stateParams);


  vm.submitComment = function() {
    File
      .addComment({ id: vm.file._id }, vm.comment)
      .$promise
      .then(() => {
        vm.comment = {};
        // vm.file = File.get({ id: $stateParams.id });
      });
  };

  // vm.deleteComment = function() {
  //   File
  //     .remove({ id: vm.file_id }, vm.comment)
  //     .$promise
  //     .then();
  // };


  vm.delete = file => {
    File
      .remove({ id: file.id })
      .$promise
      .then(() => {
        $state.go('filesEdit');
      });
  };
}
