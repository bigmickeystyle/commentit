var myapp = angular.module('CommentIt', ['ngMessages', 'ui.router']);

myapp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
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
    });
});

myapp.controller('homecontroller', homecontroller);
myapp.controller('uploadcontroller', uploadcontroller);
myapp.controller('registercontroller', registercontroller);
