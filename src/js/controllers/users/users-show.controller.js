angular
  .module('whatsOn')
  .controller('usersShowCtrl', usersShowCtrl);

usersShowCtrl.$inject = [
  'User',
  'File',
  '$stateParams'
];
function usersShowCtrl(
  User,
  File,
  $stateParams
) {
  const vm = this;
<<<<<<< HEAD

=======
  // vm.deleteFile = deleteFile;
  console.log(vm);
>>>>>>> 314f6e33000f025ede70f5872ff2f492f4f6bb9d
  User
    .getCreatedFiles({ id: $stateParams.id })
    .$promise
    .then((files) => {
<<<<<<< HEAD
=======
    // console.log('files passed to vm.files', files);
>>>>>>> 314f6e33000f025ede70f5872ff2f492f4f6bb9d
      vm.files = files;
    });

  User
    .get({ id: $stateParams.id })
    .$promise
    .then( user => {
      vm.user = user;
    // console.log('user', user);
    });
<<<<<<< HEAD
=======

  vm.play = url => {
    const audio = new Audio(url);
    audio.play();
    vm.isPlaying = true;
  };


  // function deleteFile(file) {
  //   console.log('delete button clicked');
  //   console.log(file);
  // //   User
  // //     .deleteFile({ id: $stateParams.id , fileId: vm.user.files._id })
  // //     .$promise
  // //     .then(() => {
  // //       console.log('deleted');
  // //     });
  // }

>>>>>>> 314f6e33000f025ede70f5872ff2f492f4f6bb9d
}
