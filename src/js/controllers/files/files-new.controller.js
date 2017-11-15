angular
  .module('whatsOn')
  .controller('filesNewCtrl', filesNewCtrl);

filesNewCtrl.$inject = ['File', '$state', 'filepickerService', '$scope', '$http', 'currentUserService'];

function filesNewCtrl(File, $state, filepickerService, $scope, $http, currentUserService) {
  const vm = this;
  vm.title = 'Upload File';
  vm.file = {};
  vm.submit = textFileSubmit;

  vm.pickFile = () => {
    filepickerService.pick(
      {mimetype: 'text/*'},
      (Blob) => {
        if (Blob && Blob.url) {
          vm.file.content = Blob.url;
          $http
            .get(Blob.url)
            .then(response => {
              vm.file.html = response.data;
            });
          $scope.$apply();
        }
      }
    );
  };

  function textFileSubmit() {
    vm.file.createdBy = currentUserService.currentUser.id;
    File
      .save(vm.file)
      .$promise
      .then(() => {
        $state.go('filesIndex');
      });
  }
}
