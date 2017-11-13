angular
  .module('whatsOn')
  .config(Filestack);

File.$inject = ['filepickerProvider'];
function Filestack(filepickerProvider) {
  filepickerProvider.setKey('Aa4lICuSqS9yb3gD3BfvEz');
}
