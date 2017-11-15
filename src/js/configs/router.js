angular
  .module('whatsOn')
  .config(Router);


Router.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider'
];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/authentications/register.html',
      controller: 'registerCtrl as vm'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/authentications/login.html',
      controller: 'loginCtrl as vm'
    })
    .state('oauth', {
      url: '/oauth/facebook',
      templateUrl: 'js/views/authentications/login.html',
      controller: 'loginCtrl as vm'
    })
    // .state('usersShow', {
    //   url: '/users/:id',
    //   templateUrl: 'js/views/users/show.html'
    // })
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/index.html',
      controller: 'usersIndexCtrl as vm'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/js/views/users/show.html',
      controller: 'usersShowCtrl as vm'
    })
    .state('filesIndex', {
      url: '/',
      templateUrl: 'js/views/files/index.html',
      controller: 'filesIndexCtrl as vm'
    })
    .state('filesNew', {
      url: '/files/new',
      templateUrl: 'js/views/files/form.html',
      controller: 'filesNewCtrl as vm'
    })
    .state('filesShow', {
      url: '/files/:id',
      templateUrl: 'js/views/files/show.html',
      controller: 'filesShowCtrl as vm'
    })
    .state('comments', {
      url: '/files/:id/comments',
      templateUrl: 'js/views/files/show.html',
      controller: 'filesShowCtrl as vm'
    })
    .state('commentsDelete', {
      url: '/files/:id/comments/:commentId',
      templateUrl: 'js/views/files/show.html',
      controller: 'filesShowCtrl as vm'
    });

  $urlRouterProvider.otherwise('/');
}
