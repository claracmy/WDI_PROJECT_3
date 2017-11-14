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


  vm.delete = file => {
    File
      .remove({ id: file._id })
      .$promise
      .then(() => {
        $state.go('filesIndex');
      });
  };
}
