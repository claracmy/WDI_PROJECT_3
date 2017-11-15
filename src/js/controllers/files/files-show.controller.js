angular
  .module('whatsOn')
  .controller('filesShowCtrl', filesShowCtrl);

filesShowCtrl.$inject = ['File', '$stateParams', '$state'];

function filesShowCtrl(File, $stateParams, $state) {
  const vm = this;
  vm.boolean = true;
  vm.editTitle = editTitle;
  vm.showEditForm = showEditForm;

  File
    .get({ id: $stateParams.id })
    .$promise
    .then((file) => {
      vm.file = file;
    });

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
        getFile();
      });
  };

  function getFile() {
    File
      .get({ id: $stateParams.id })
      .$promise
      .then(data => {
        vm.comment = {};
        vm.file.comments = data.comments;
      });
  }

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
