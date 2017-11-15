angular
  .module('whatsOn')
  .controller('filesShowCtrl', filesShowCtrl);

filesShowCtrl.$inject = ['File', '$stateParams', '$state'];

function filesShowCtrl(File, $stateParams, $state) {
  const vm = this;
  vm.boolean = true;
  vm.file = File.get($stateParams);

  File
    .get({ id: $stateParams.id })
    .$promise
    .then((file) => {
      vm.file = file;
    });

  vm.delete = file => {
    File
      .remove({ id: file._id })
      .$promise
      .then(() => {
        $state.go('filesIndex');
      });
  };

  vm.like = function() {
    vm.file.likes = {};
    File
      .addLike({ id: vm.file._id }, vm.file.likes)
      .$promise
      .then(() => {
        vm.file = File.get({ id: $stateParams.id });
      });
  };

  vm.unlike = function(like) {
    console.log(like);
    File
      .removeLike({ id: vm.file._id, likeId: like._id })
      .$promise
      .then(() => {
        console.log('unliked');
      });
  };

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

  vm.showEditForm = () => {
    vm.boolean = !vm.boolean;
  };

  vm.editTitle = () => {
    File
      .update({ id: $stateParams.id }, vm.file)
      .$promise
      .then(() => {
        vm.file = File.get({ id: $stateParams.id });
        vm.boolean = !vm.boolean;
      });
  };
}
