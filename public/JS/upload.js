var app = angular.module('CommentIt', ['ngMessages']);


app.controller('uploadpage', function($scope, $http) {
    console.log("loaded");
    $scope.submitted = false;
    $scope.parse = function(){
        $http({
            url: '/parse',
            method: 'POST',
            params: {
                'url': this.link.url,
                'tags': this.link.tags
            }
        }).then(function(parsed_info){
            var details = parsed_info.data.info;
            $scope.parsed_info = details;
            $scope.submitted = true;
        });
    };
    // create the handlers for the angular
    $scope.submit = function(){
        console.log("submitted in angular");
        $http({
            url: '/save/link',
            method: 'POST',
            params: $scope.parsed_info
        }).then(function(){
            "Saved";
        });
    };
    $scope.edit = function(){
        $scope.editing = true;
    };
});
