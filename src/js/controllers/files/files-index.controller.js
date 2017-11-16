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

  vm.play = url => {
    const audio = new Audio(url);
    audio.play();
    vm.isPlaying = file => {
      file.isPlaying = true;
    }
  };

  vm.pause = url => {
    const audio = new Audio(url);
    audio.pause();
    file.isPlaying = false;
  };

}
