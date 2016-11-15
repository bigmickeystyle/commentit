var homecontroller = function($scope, $http, $rootScope, $location, $cookies){
    $scope.image = "./public/images/logo.png";
    $scope.username = $cookies.get("username");
    var currentLink;
    if ($scope.username != undefined) {
        $rootScope.username = $scope.username;
    }

    if ($location.$$path.search("/profile") == -1) {
        $http.get('/links').then(function(links){
            $scope.links = links.data.links;
            $scope.showComments($scope.links[0]);
        });
    } else {
        $scope.$watch('change', function(values){
            $scope.links = $scope.$parent.links;
            if ($scope.links) {
                $scope.showComments($scope.links[0]);
            }
        });
    }

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
        //try to see if it works at the home page. if not then try just $scope.$parent
        if ($scope.$parent.comments){
            $scope.comments = $scope.$parent.comments.filter(function(comment){
                console.log(comment);
                return comment.link_id == linkId;
            }).filter(function(comment){
                console.log(comment.parent_id);
                return comment.parent_id == 0;
            });
        } else {
            $http.get('/comments', {
                params: {
                    id: linkId
                }
            }).then(function(results){
                $scope.comments = results.data.comments;
            }).catch(function(err){
                console.log(err);
            });
        }
        $scope.submitComment = function(){
            if ($scope.username == undefined) {
                console.log("Need to be logged in!");
                //display this error
                //save current window location so after the user logs in we can redirect them back here
                return;
            }
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
                }).then(function(results){
                    $scope.comments.childcomments.push(results.data.comments[0]);
                    $scope.commentSelected.replies += 1;
                });
            }
        };
    };
    $scope.upvote = function() {
        if ($scope.username == undefined) {
            console.log("Need to be logged in!");
            //display this error
            //save current window location so after the user logs in we can redirect them back here
            return;
        }
        $http.post('/upvote', {
            username: $scope.username,
            link: $scope.linkSelected
        }).success(function(){
            if ($scope.upvotes) {
                $scope.$parent.countUpvotes();
            }
            $scope.linkSelected.upvote_count++;
            $scope.linkSelected.upvoted = true;
        });
        console.log("upvote");
    };
    $scope.expand = function(comment){
        if($scope.commentSelected == comment){
            commentId = this.comment.id;
            angular.element('#'+commentId).removeClass("reveal-comments");
            $scope.comments.childcomments = null;
            $scope.commentSelected = null;
        } else {
            $scope.commentSelected = comment;
            var commentId = this.comment.id;
            angular.element('#'+commentId).addClass("reveal-comments");
            $http.get('/comments/child', {
                params: {
                    id: commentId
                }
            }).then(function(results){
                $scope.comments.childcomments = results.data.comments;
            });
        }
    };
    $scope.replace = function(childcomment){
        $scope.comments = $scope.comments.childcomments;
        $scope.comments.header = childcomment;
        $scope.comments.childcomments = null;
    };
};

homecontroller.$inject = ['$scope', '$http', '$rootScope', '$location', '$cookies'];
