angular
  .module('whatsOn')
  .config(Filestack);

File.$inject = ['filepickerProvider'];
function Filestack(filepickerProvider) {
  filepickerProvider.setKey('AmpArWqqSsw0eUysfqOSQz');
}
