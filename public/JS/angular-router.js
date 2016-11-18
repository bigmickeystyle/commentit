var myapp = angular.module('CommentIt', ['ui.router', 'ngCookies']);

myapp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '../HTML/home.html',
        controller: 'homecontroller'
    })
    .state('upload', {
        url: '/upload',
        templateUrl: '../HTML/upload.html',
        controller: 'uploadcontroller'
    })
    .state('register', {
        url: '/register',
        templateUrl: '..//HTML/register.html',
        controller: 'registercontroller'
    })
    .state('profile', {
        url: '/profile/:user',
        views: {
            '': {
                templateUrl: '..//HTML/profile.html',
                controller: 'profilecontroller'
            },
            'links@profile': {
                templateUrl: '..//HTML/home.html',
                controller: 'homecontroller'
            }
        }
    })
    .state('bookmarks', {
        url: '/bookmarks/:user',
        views: {
            '': {
                templateUrl: '../HTML/bookmarks.html',
                controller: 'bookmarkscontroller'
            },
            'links@bookmarks': {
                templateUrl: '..//HTML/home.html',
                controller: 'homecontroller'
            }
        }
    })
    .state('login', {
        url: '/login',
        templateUrl: '..//HTML/login.html',
        controller: 'logincontroller'
    })
    .state('settings', {
        url: '/settings',
        templateUrl: '..//HTML/settings.html',
        controller: 'settingscontroller'
    });
});

myapp.controller('homecontroller', homecontroller);
myapp.controller('uploadcontroller', uploadcontroller);
myapp.controller('registercontroller', registercontroller);
myapp.controller('profilecontroller', profilecontroller);
myapp.controller('logincontroller', logincontroller);
myapp.controller('settingscontroller', settingscontroller);
myapp.controller('bookmarkscontroller', bookmarkscontroller);

myapp.controller('logoutcontroller', function($scope, $state, $stateParams, $window, $cookies, $rootScope) {
    $scope.logout = function(){
        $rootScope.username = undefined;
        $cookies.remove('username');
        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    };
});
