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
    .state('home', {
      url: '/',
      templateUrl: 'js/views/statics/home.html'
    })
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
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/index.html',
      controller: 'usersIndexCtrl as vm'
    })
    .state('filesIndex', {
      url: '/files',
      templateUrl: 'js/views/files/index.html',
      controller: 'filesIndexCtrl as vm'
    })
    .state('filesNew', {
      url: '/files/new',
      templateUrl: '/js/views/files/form.html',
      controller: 'filesNewCtrl as vm'
    })
    .state('filesShow', {
      url: '/files/:id',
      templateUrl: 'js/views/files/show.html',
      controller: 'filesShowCtrl as vm'
    })
    .state('filesEdit', {
      url: '/files/:id/edit',
      templateUrl: 'js/views/files/form.html',
      controller: 'filesEditCtrl as vm'
    });
  // .state('comments', {
  //   url: '/files/:id',
  //   templateUrl: 'js/views/files/show.html',
  //   controller: 'createCommentCtrl as vm'
  // });

  $urlRouterProvider.otherwise('/');
}
