angular.module('whatsOn').controller('usersShowCtrl', usersShowCtrl);

usersShowCtrl.$inject = ['User', 'File', '$stateParams'];
function usersShowCtrl(User, File, $stateParams) {
  const vm = this;

  console.log(vm);
  User.getCreatedFiles({ id: $stateParams.id }).$promise.then(files => {
    vm.files = files;
  });

  User.get({ id: $stateParams.id }).$promise.then(user => {
    vm.user = user;
  });

  vm.play = url => {
    const audio = new Audio(url);
    audio.play();
    vm.isPlaying = true;
  };
}
