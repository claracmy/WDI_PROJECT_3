angular.module('whatsOn').controller('filesIndexCtrl', filesIndexCtrl);

filesIndexCtrl.$inject = ['File', '$anchorScroll'];

function filesIndexCtrl(File, $anchorScroll) {
  const vm = this;

  File.query().$promise.then(files => {
    vm.files = files;
  });

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

  $anchorScroll();
}
