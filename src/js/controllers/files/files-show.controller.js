angular
  .module('whatsOn')
  .controller('filesShowCtrl', filesShowCtrl);

filesShowCtrl.$inject = ['File', '$stateParams', '$state'];

function filesShowCtrl(File, $stateParams, $state) {
  const vm = this;
  vm.boolean = true;

  File
    .get({ id: $stateParams.id })
    .$promise
    .then((file) => {
      vm.file = file;
    });

  vm.editTitle = editTitle;
  vm.showEditForm = showEditForm;

  vm.submitComment = function() {
    File
      .addComment({ id: vm.file._id }, vm.comment)
      .$promise
      .then(() => {
        vm.comment = {};
        vm.file = File.get({ id: $stateParams.id });
      });
  };


  vm.deleteComment = function(comment) {
    File
      .deleteComment({id: vm.file._id, commentId: comment._id})
      .$promise
      .then(() => {
        console.log('deleted');
      });
  };


  function showEditForm() {
    vm.boolean = !vm.boolean;
  }

  function editTitle() {
    File
      .update({ id: $stateParams.id }, vm.file)
      .$promise
      .then(() => {
        vm.file = File.get({ id: $stateParams.id });
        vm.boolean = !vm.boolean;
      });
  }

  vm.delete = file => {
    File
      .remove({ id: file._id })
      .$promise
      .then(() => {
        $state.go('filesIndex');
      });
  };
}
