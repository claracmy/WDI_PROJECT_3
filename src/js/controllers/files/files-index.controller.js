angular
  .module('whatsOn')
  .controller('filesIndexCtrl', filesIndexCtrl);

filesIndexCtrl.$inject = ['File','$anchorScroll'];

function filesIndexCtrl(File, $anchorScroll) {
  const vm = this;

  File
    .query()
    .$promise
    .then(files => {
      vm.files = files;
    });

  vm.play = function(e, url) {
    const audio = new Audio(url);
    audio.play();
    e.currentTarget.isPlaying = true;
  };

  vm.pause = function(e, url) {
    const audio = new Audio(url);
    audio.pause();
    e.currentTarget.isPlaying = false;
  };

  $anchorScroll();

}
