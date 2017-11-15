angular
  .module('whatsOn')
  .controller('filesShowCtrl', filesShowCtrl);

filesShowCtrl.$inject = ['File', '$stateParams', '$state'];

function filesShowCtrl(File, $stateParams, $state) {
  const vm = this;
  console.log('this is vm', vm);
  vm.boolean = true;

  File
    .get({ id: $stateParams.id })
    .$promise
    .then((file) => {
      vm.file = file;
      console.log('this is vm.file', vm.file);
    });

  vm.editTitle = editTitle;
  vm.showEditForm = showEditForm;

  vm.submitComment = function() {
    console.log('submit comment function is fired');
    File
      .addComment({ id: vm.file._id }, vm.comment)
      .$promise
      .then(() => {
        console.log('this is vm in the submit function', vm);
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
    console.log('boolean before edit', vm.boolean);
    vm.boolean = !vm.boolean;
    console.log('boolean before edit', vm.boolean);
  }

  function editTitle() {
    console.log('edittitle function fired');
    File
      .update({ id: $stateParams.id }, vm.file)
      .$promise
      .then(() => {
        console.log('this is the new title', vm.file);
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
