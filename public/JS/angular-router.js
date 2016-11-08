var myapp = angular.module('CommentIt', ['ngMessages', 'ui.router']);

myapp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '../HTML/home.html'
    })
    .state('upload', {
        url: '/load',
        templateUrl: '../HTML/upload.html',
        controller: 'uploadcontroller'
    });
});

myapp.controller('uploadcontroller', uploadcontroller);
