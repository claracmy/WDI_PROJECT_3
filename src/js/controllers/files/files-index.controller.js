angular
  .module('whatsOn')
  .controller('filesIndexCtrl', filesIndexCtrl);

filesIndexCtrl.$inject = ['File'];

function filesIndexCtrl(File) {
  const vm = this;
  File
    .query()
    .$promise
    .then(files => {
      vm.files = files;
    });
}
