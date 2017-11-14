angular
  .module('whatsOn')
  .factory('File', File);

File.$inject = [
  '$resource',
  'API'
];
function File(
  $resource,
  API){
  return $resource(`${API}/files/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' },
    'addComment': { url: `${API}/files/:id/comments`, id: '@_id', method: 'POST' },
    'deleteComment': { url: `${API}/files/:id/comments/:commentId`, id: '@_id', commentId: '@_id', method: 'DELETE' }
  });
}
