// angular
//   .module('whatsOn')
//   .controller('createCommentCtrl', createCommentCtrl);
//
// createCommentCtrl.$inject = ['$stateParams', 'File'];
//
// function createCommentCtrl($stateParams, File) {
//   const vm = this;
//   vm.file = File.get($stateParams);
//
//
//   console.log('this is vm.file', vm.file);
//   console.log('this is File', File);
//   console.log('this is a get param get req to File', File.get($stateParams));
//
// //   // we update the file model with vm.comment
// //
// //   // vm.submitComment = function() {
// //   //   console.log('working');
// //   //   File
// //   //     .save(vm.file.comments)
// //   //     .$promise
// //   //     .then(() => {
// //   //       console.log(vm.file.comments);
// //   //     });
// //   // };
// //
// //   vm.submitComment = comment => {
// //     console.log('second function fired');
// //     File
// //       .update({ id: vm.file._id }, comment)
// //       .$promise
// //       .then(() => {
// //         $state.go('filesShow', { id: vm.file._id });
// //       });
// //   };
// }
// //
// // // File
// // //  .get($stateParams)
// // //  .update({ id: comment.id }, comment)
// // //  .then((comment) => vm.comments.push(comment))
// // //  .catch(next)
// // // //  push the comment in the array of comments
// // // function createComment() {
// // //   // link it to the file id
// // //   //
// // // }
// // //
// // //   vm.submitComment = comment => {
// // //     console.log('this is comment before', comment);
// // //     File
// // //       .update({ id: comment.id }, comment)
// // //       .$promise
// // //       .then(() => {
// // //         $state.go('filesShow', {id: vm.file.id});
// // //       });
// // //     console.log('this is comment before', comment);
