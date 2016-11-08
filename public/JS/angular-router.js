var app = angular.module('CommentIt', ['ngMessages', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/',
            templateURL: 'home.html'
        })
        .state('upload', {
            url: '/load',
            templateURL: 'upload.html',
            controller: 'upload.js'
        });
});
