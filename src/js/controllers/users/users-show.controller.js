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
  // vm.deleteFile = deleteFile;
  console.log($stateParams);
  User
    .getCreatedFiles({ id: $stateParams.id })
    .$promise
    .then((files) => {
      console.log('files passed to vm.files', files);
      vm.files = files;
    });
  User
    .get({ id: $stateParams.id })
    .$promise
    .then( user => {
      vm.user = user;
      console.log('user', user);
    });


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

}
