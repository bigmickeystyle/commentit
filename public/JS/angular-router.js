var myapp = angular.module('CommentIt', ['ui.router']);

myapp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '../HTML/home.html',
        controller: 'homecontroller'
    })
    .state('upload', {
        url: '/load',
        templateUrl: '../HTML/upload.html',
        controller: 'uploadcontroller'
    })
    .state('register', {
        url: '/register',
        templateUrl: '..//HTML/register.html',
        controller: 'registercontroller'
    })
    .state('profile', {
        url: '/profile',
        templateUrl: '..//HTML/profile.html',
        controller: 'profilecontroller'
    })
    .state('login', {
        url: '/login',
        templateUrl: '..//HTML/login.html',
        controller: 'logincontroller'
    });
});

myapp.controller('homecontroller', homecontroller);
myapp.controller('uploadcontroller', uploadcontroller);
myapp.controller('registercontroller', registercontroller);
myapp.controller('profilecontroller', profilecontroller);
myapp.controller('logincontroller', logincontroller);
