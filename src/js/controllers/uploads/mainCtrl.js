angular
  .module('whatsOn')
  .controller('mainController', mainController);

mainController.$inject = [
  '$scope',
  'fileModel', //there's the error he didn't pass it in cause he passed a dep in the module
  'uploadFileService'
];
function mainController(
  $scope,
  fileModel,
  uploadFileService
) {
  $scope.file = {};

  $scope.Submit = function() {
    console.log('browse clicked');
    $scope.uploading = true; //to show some stuff on the html
    uploadFileService.upload($scope.file).then(function(data) {
      if (data.data.success) { // if success is true
        $scope.uploading = false;
        $scope.alert = 'alert alert-success'; //bootstrap
        $scope.mesage = data.data.message; //returned message from the api
        $scope.file = {}; //clear the file
      } else { // if uploading doesn't work
        $scope.uploading =  false;
        $scope.alert = 'alert alert-danger';
        $scope.message = data.data.message;
        $scope.file = {};
      }
    });
  };

}
