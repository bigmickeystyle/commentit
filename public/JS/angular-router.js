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
            controller: function($scope, $http) {
                console.log("loaded");
                $scope.submitted = false;
                $scope.parse = function(){
                    $scope.submitted = true;
                    $http({
                        url: '/parse',
                        method: 'POST',
                        params: {
                            'url': this.link.url,
                            'tags': this.link.tags
                        },
                        success: function(parsed_info){
                            console.log(parsed_info);
                        }
                    });
                };
            }
        });
});
