var page = angular.module('CommentIt', ['ngMessages']);

page.controller('uploadpage', function($scope, $http) {
    console.log("loaded");
    $scope.parse = function(){
        $http({
            url: '/parse',
            method: 'POST',
            params: {
                'url': this.link.url,
                'tags': this.link.tags
            }
        });
    };
});
