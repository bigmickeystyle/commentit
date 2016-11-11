var homecontroller = function($scope, $http){
    $http.get('/links').then(function(links){
        console.log(links);
        $scope.links = links.data.links;
    });
    $scope.showComments = function(){
        $scope.image = this.link.image;
        var linkId = this.link.id;
        $http.get('/comments', {
            params: {
                id: linkId
            }
        }).then(function(results){
            $scope.comments = results.data.comments;
        });
    };
};

homecontroller.$inject = ['$scope', '$http'];
