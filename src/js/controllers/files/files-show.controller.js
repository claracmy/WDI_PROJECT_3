angular.module('whatsOn').controller('filesShowCtrl', filesShowCtrl);

filesShowCtrl.$inject = ['File', '$stateParams', '$state'];

function filesShowCtrl(File, $stateParams, $state) {
  const vm = this;
  vm.boolean = true;
  vm.file = File.get($stateParams);
  vm.editTitle = editTitle;
  vm.showEditForm = showEditForm;

  getFile();

  vm.delete = file => {
    File.remove({ id: file._id })
      .$promise.then(() => {
        $state.go('filesIndex');
      });
  };

  vm.like = function() {
    vm.file.likes = {};
    File.addLike({ id: vm.file._id }, vm.file.likes)
      .$promise
      .then(() => {
        getFile();
      });
  };

  vm.unlike = function() {
    File
      .removeLike({ id: vm.file._id })
      .$promise
      .then(() => {
        getFile();
      });
  };

  vm.submitComment = function() {
    File.addComment({ id: vm.file._id }, vm.comment)
      .$promise
      .then(() => {
        vm.comment = {};
        vm.file = File.get({ id: $stateParams.id });
      });
  };

  vm.deleteComment = function(comment) {
    File.deleteComment({
      id: vm.file._id,
      commentId: comment._id
    }).$promise
      .then(() => {
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
        vm.file.likes = data.likes;
      });
  }

  function showEditForm() {
    vm.boolean = !vm.boolean;
  }

  function editTitle() {
    File.update({ id: $stateParams.id }, vm.file).$promise.then(() => {
      vm.file = File.get({ id: $stateParams.id });
      vm.boolean = !vm.boolean;
    });
  }
}
