angular
  .module('whatsOn')
  .controller('commentsDeleteCtrl', commentsDeleteCtrl);

commentsDeleteCtrl.$inject = ['$stateParams', 'File', '$state'];

function commentsDeleteCtrl($stateParams, File, $state){
  const vm = this;
  vm.file = File.get($stateParams);

  vm.commentDelete = comment => {
    File
      .remove({ id: comment._id })
      .$promise
      .then(() => {
        $state.go('usersIndex');
        console.log('hello');
      });
  };
}
