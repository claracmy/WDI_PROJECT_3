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
    'addComment': { url: `${API}/files/:id/comments`, method: 'POST' }
  });
}
