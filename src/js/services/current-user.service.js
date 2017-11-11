angular//STEP 5
  .module('whatsOn')
  .service('currentUserService', currentUserService);

currentUserService.$inject = [ '$auth', 'User', '$rootScope'];

function currentUserService($auth, User, $rootScope) {
  const self = this;

  self.getUser = () => {
    //converts token into a user id from local storage.
    const decoded = $auth.getPayload();

    if (decoded) {
      User
        .get({ id: decoded.userId })
        .$promise
        .then(user => {
          //using the id from the token to find the user in the database, once returned store in service to be used in other modules.
          self.currentUser = user;
          $rootScope.$broadcast('loggedIn');
        });
    }
  };

  self.removeUser = () => {
    self.currentUser = null;
    $auth.logout();
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser();
}
