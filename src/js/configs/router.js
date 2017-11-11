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
      templateUrl: 'js/views/authentications/login.html'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/index.html'
    });


  $urlRouterProvider.otherwise('/');
}
