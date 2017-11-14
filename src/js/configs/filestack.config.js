angular
  .module('whatsOn')
  .config(Filestack);

File.$inject = ['filepickerProvider'];
function Filestack(filepickerProvider) {
  filepickerProvider.setKey('AE8w9lLxSCSDIMHZ48PQgz');
}
