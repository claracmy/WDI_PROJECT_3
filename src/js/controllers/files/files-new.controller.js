angular
  .module('whatsOn')
  .controller('filesNewCtrl', filesNewCtrl);

filesNewCtrl.$inject = ['File', '$state', 'filepickerService', '$scope', '$http'];

function filesNewCtrl(File, $state, filepickerService, $scope, $http) {
  const vm = this;
  vm.title = 'Upload File';
  vm.file = {};

  vm.submit = () => {
    File
      .save(vm.file)
      .$promise
      .then(() => {
        $state.go('filesIndex');
      });
  };

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
}
