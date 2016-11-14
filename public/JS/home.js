var homecontroller = function($scope, $http, $rootScope, $cookies){
    $scope.image = "./public/images/logo.png";
    $scope.username = $cookies.get("username");
    var currentLink;
    if ($scope.username != undefined) {
        $rootScope.username = $scope.username;
    }
    $http.get('/links').then(function(links){
        $scope.links = links.data.links;
        $scope.showComments($scope.links[0]);
    });

    $scope.linkIsSelected = function(link) {
        return $scope.linkSelected === link;
    };

    $scope.commentIsSelected = function(comment) {
        return $scope.commentSelected === comment;
    };
    $scope.showComments = function(link){
        $scope.commentSelected = null;
        currentLink = link;
        $scope.linkSelected = link;
        var linkId = link.id;
        angular.element('#'+linkId).addClass("reveal-comments");
        $http.get('/comments', {
            params: {
                id: linkId
            }
        }).then(function(results){
            $scope.comments = results.data.comments;
        }).catch(function(err){
            console.log(err);
        });
        $scope.submitComment = function(){
            if(!$scope.commentSelected){
                $http.post('/comments', {
                    comment: $scope.commenttext,
                    user: $scope.username,
                    link: currentLink
                }).then(function(results){
                    $scope.comments.push(results.data.comments[0]);
                });
            }
            else{
                $http.post('/comments', {
                    comment: $scope.commenttext,
                    link: currentLink,
                    user: $scope.username,
                    parent: $scope.commentSelected.id
                });
            }
        };
    };

    $scope.expand = function(comment){
        $scope.commentSelected = comment;
        console.log(comment);
        var commentId = this.comment.id;
        console.log(commentId);
        angular.element('#'+commentId).addClass("reveal-comments");
        $http.get('/comments/child', {
            params: {
                id: commentId
            }
        }).then(function(results){
            console.log(results);
            $scope.childcomments = results.data.comments;
        });
    };
};

homecontroller.$inject = ['$scope', '$http', '$rootScope', '$cookies'];
