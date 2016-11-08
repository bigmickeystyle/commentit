var app = angular.module('CommentIt', ['ngMessages']);


app.controller('uploadpage', function($scope, $http) {
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
});
