angular
  .module('whatsOn')
  .factory('User', User);

User.$inject = [
  '$resource',
  'API'
];
function User(
  $resource,
  API){
  return $resource(`${API}/users/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' },
    'getCreatedFiles': { url: `${API}/users/:id/files`, method: 'GET', isArray: true  },
    'deleteFile': { url: `${API}/users/:id/:fileId`, id: '@_id', fileId: '@_id', method: 'DELETE' }
  });
}
