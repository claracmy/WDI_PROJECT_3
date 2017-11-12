angular
  .module('whatsOn')
  .service('uploadFileService', uploadFileService);

uploadFileService.$inject = [ '$http' ];

function uploadFileService($http) {

  this.upload = function(file) {
    const fd = new FormData();
    fd.append('myfile', file.upload);
    return $http.post('/upload', fd, {
      transformRequest: angular.identity, //remove serialization of data by angular, but what is serialization?
      headers: { 'Content-Type': undefined } //delete that line and you get an error
    });
  };
}
