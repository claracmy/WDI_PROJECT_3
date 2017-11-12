angular
  .module('whatsOn')
  .directive('fileModel', fileModel);

fileModel.$inject = ['$parse'];

function fileModel($parse) {

  return {
    restrict: 'A', // restrict to attributes
    link: function(scope, element, attrs) {
      const parsedFile = $parse(attrs.fileModel);
      const parsedFileSetter = parsedFile.assign;

      element.bind('change', function() {
        scope.$apply(function(){
          parsedFileSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}
