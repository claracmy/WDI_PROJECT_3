angular
  .module('whatsOn')
  .controller('filesNewCtrl', filesNewCtrl);

filesNewCtrl.$inject = ['File', '$state', 'filepickerService', '$scope'];

function filesNewCtrl(File, $state, filepickerService, $scope) {
  const vm = this;
  vm.title = 'Upload File';
  vm.file = {};
  // vm.submit = textFileSubmit;
  //
  // function textFileSubmit() {
  //   File
  //     .save(vm.file)
  //     .$promise
  //     .then(() => {
  //       console.log(vm.file);
  //       $state.go('filesIndex');
  //     });
  // }

  vm.pickFile = () => {
    // e.preventDefault();
    filepickerService.pick(
      {mimetype: 'text/*'},
      (Blob) => {
        if (Blob && Blob.url) {
console.log(Blob);
// console.log(Blob);
          vm.file.content = Blob.url;
          $scope.$apply();
        }
      }
    );
  };
}
