var myapp = angular.module('CommentIt', ['ui.router']);

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
    })
    .state('profile', {
        url: '/profile',
        templateUrl: '..//HTML/profile.html',
        controller: 'profilecontroller'
<<<<<<< HEAD
=======
    })
    .state('login', {
        url: '/login',
        templateUrl: '..//HTML/login.html',
        controller: 'logincontroller'
>>>>>>> 98cf6c2565f099a2c2b1be0db5e496415f03285f
    });
});

myapp.controller('homecontroller', homecontroller);
myapp.controller('uploadcontroller', uploadcontroller);
myapp.controller('registercontroller', registercontroller);
myapp.controller('profilecontroller', profilecontroller);
<<<<<<< HEAD
=======
myapp.controller('logincontroller', logincontroller);
>>>>>>> 98cf6c2565f099a2c2b1be0db5e496415f03285f
