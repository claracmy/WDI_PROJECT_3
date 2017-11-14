angular
  .module('whatsOn')
  .controller('filesShowCtrl', filesShowCtrl);

filesShowCtrl.$inject = ['File', '$stateParams', '$state', 'currentUserService'];

function filesShowCtrl(File, $stateParams, $state, currentUserService) {
  const vm = this;
  console.log('vm.user before', vm.user);
  vm.file = File.get($stateParams);
  vm.user = currentUserService.currentUser.id;
  console.log('vm.user after', vm.user);
  console.log(vm);
console.log('vm.file', vm.file);
// console.log('vm.file._id', vm.file._id); undefined
// console.log('vm.file.id', vm.file.id); undefined

  vm.submitComment = function(comment) {
console.log('working');
console.log('comment', comment);
console.log('comment.content', comment.content);
console.log('stateparams', $stateParams);
    File
      .addComment( { id: $stateParams.id }, vm.comment) //it is throwing an error at that point
      .$promise
      .then(() => {
        console.log('reached .then promise');
        console.log('vm.file after submit', vm.file);
        vm.comment = '';
        $state.go('filesShow', {id: vm.file.id});
      });
  };


  vm.delete = file => {
    File
      .remove({ id: file.id })
      .$promise
      .then(() => {
        $state.go('filesIndex');
      });
  };
}
