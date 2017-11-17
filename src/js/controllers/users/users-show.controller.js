angular.module('whatsOn').controller('usersShowCtrl', usersShowCtrl);

usersShowCtrl.$inject = ['User', 'File', '$stateParams'];
function usersShowCtrl(User, File, $stateParams) {
  const vm = this;
  vm.editProfile = editProfile;

  User
    .getCreatedFiles({ id: $stateParams.id })
    .$promise
    .then((files) => {
      vm.files = files;
    });

  User
    .get({ id: $stateParams.id })
    .$promise
    .then( user => {
      vm.user = user;
    });

  function editProfile() {
    console.log(vm.user.id);
    console.log(vm.user);
    User
      .update({ id: vm.user.id }, vm.user)
      .$promise
      .then(() => {
        vm.user = User.get({ id: vm.user.id });
      });
  }

  const audio = new Audio();

  vm.play = function($event, file) {
    vm.files.forEach(file => {
      file.isPlaying = false;
    });

    file.isPlaying = true;
    $event.currentTarget.isPlaying = !$event.currentTarget.isPlaying;

    if ($event.currentTarget.isPlaying) {
      audio.src = file.audio;
      audio.play();
    } else {
      file.isPlaying = false;
      audio.pause();
    }
  };
}
