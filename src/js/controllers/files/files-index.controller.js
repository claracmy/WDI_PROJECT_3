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

 vm.play = url => {
   const audio = new Audio(url);
   audio.play();
   vm.isPlaying = true;
 };

 vm.pause = url => {
   const audio = new Audio(url);
   audio.pause();
   vm.isPlaying = false;
 };

 $anchorScroll();

}
