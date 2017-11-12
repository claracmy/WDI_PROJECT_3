angular
  .module('whatsOn')
  .controller('filesNewCtrl', filesNewCtrl);

filesNewCtrl.$inject = ['File', '$state', 'filepickerService', '$scope', '$http'];

function filesNewCtrl(File, $state, filepickerService, $scope, $http) {
  const vm = this;
  vm.title = 'Upload File';
  vm.file = {};
  vm.submit = textFileSubmit;

  function textFileSubmit() {
    File
      .save(vm.file)
      .$promise
      .then(() => {
        console.log(vm.file);
        $state.go('filesIndex');
      });
  }
let html;
  vm.pickFile = () => {
    // e.preventDefault();
    filepickerService.pick(
      {mimetype: 'text/*'},
      (Blob) => {
        if (Blob && Blob.url) {
console.log(Blob);
// console.log(Blob);
          vm.file.content = Blob.url;
          $http.get(vm.file.content).then(function(response) {
            vm.file.html = response.data;
            console.log(vm.file.html);
          });
          $scope.$apply();
        }
      }
    );
  };
}
