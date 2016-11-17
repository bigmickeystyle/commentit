var homecontroller = function($scope, $http, $rootScope, $location, $cookies){
    $scope.image = "./public/images/logo.png";
    $scope.username = $cookies.get("username");
    var currentLink;
    if ($scope.username != undefined) {
        $rootScope.username = $scope.username;
    }

    $scope.sortByPopularity = function(){
        $http.get('/popularlinks', {
            params: {
                loggedin: $rootScope.username
            }
        }).then(function(links){
            $scope.links = links.data.links;
            console.log($scope.links);
            if ($scope.links != undefined) {
                if ($scope.links.length != 0) {
                    $scope.nolinks = false;
                    $scope.showComments($scope.links[0]);
                }
            } else {
                $scope.nolinks = true;
            }
        });
        $scope.recentSort = false;
        $scope.popularitySort = true;
    };
    $scope.sortByTimestamp = function(){
        $http.get('/links', {
            params: {
                loggedin: $rootScope.username
            }
        }).then(function(links){
            $scope.links = links.data.links;
            console.log($scope.links);
            if ($scope.links != undefined) {
                if ($scope.links.length != 0) {
                    $scope.nolinks = false;
                    $scope.showComments($scope.links[0]);
                }
            } else {
                $scope.nolinks = true;
            }
        });
        $scope.recentSort = true;
        $scope.popularitySort = false;
    };

    if ($location.$$path.search("/profile") != -1 || $location.$$path.search("/bookmarks") != -1) {
        $scope.location = "nothome";
        $scope.$watch('change', function(values){
            $scope.links = $scope.$parent.links;
            console.log($scope.links);
            if ($scope.links != undefined) {
                if ($scope.links.length != 0) {
                    $scope.nolinks = false;
                    $scope.showComments($scope.links[0]);
                }
            } else {
                $scope.nolinks = true;
            }
        });
    } else {
        $scope.location = "home";
        $scope.sortByTimestamp();
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
                    id: linkId,
                    username: $scope.username
                }
            }).then(function(results){
                if (results.data.upvoted) {
                    $scope.linkSelected.upvoted = true;
                }
                $scope.comments = results.data.comments;
                $scope.comments.forEach(function(each){
                    each.level = 0;
                });
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
            else {
                $http.post('/comments', {
                    comment: $scope.commenttext,
                    link: currentLink,
                    user: $scope.username,
                    parent: $scope.commentSelected.id
                }).then(function(results){
                    results.data.comments[0].displayCommentBox = true;
                    console.log($scope.commentBox);
                    $scope.comments.splice($scope.comments.indexOf($scope.commentBox) + 1, 0, results.data.comments[0]);
                    $scope.commentBox.displayCommentBox = false;
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
        if(!$scope.expandedComments){
            $scope.expandedComments = [comment];
            $scope.commentSelected = comment;
            var commentId = this.comment.id;
            $http.get('/comments/child', {
                params: {
                    id: commentId
                }
            }).then(function(results){
                if (results.data.comments.length){
                    results.data.comments.forEach(function(comment){
                        comment.level = 1;
                    });
                    var index = $scope.comments.indexOf(comment) + 1;
                    var first = $scope.comments.slice(0, index);
                    var second = $scope.comments.slice(index, $scope.comments.length);
                    if ($scope.childcomments){
                        $scope.childcomments.push(results.data.comments);
                    } else {
                        $scope.childcomments = [results.data.comments];
                    }
                    $scope.comments = first.concat(results.data.comments);
                    $scope.commentBox = $scope.comments[$scope.comments.length -1];
                    $scope.commentBox.displayCommentBox = true;
                    $scope.comments  = $scope.comments.concat(second);
                }
            });
        } else if ($scope.expandedComments.indexOf(comment) == -1){
            $scope.expandedComments.push(comment);
            commentId = this.comment.id;
            // angular.element('#'+commentId).addClass("revealcomments").removeClass("comment");
            $scope.commentSelected = comment;
            $http.get('/comments/child', {
                params: {
                    id: commentId
                }
            }).then(function(results){
                if (results.data.comments.length){
                    if (comment.level){
                        results.data.comments.forEach(function(commentIteration){
                            commentIteration.level = comment.level + 1;
                        });
                    } else {
                        results.data.comments.forEach(function(commentIteration){
                            commentIteration.level = 1;
                        });
                    }
                    var index = $scope.comments.indexOf(comment) + 1;
                    var first = $scope.comments.slice(0, index);
                    var second = $scope.comments.slice(index, $scope.comments.length);
                    if ($scope.childcomments){
                        $scope.childcomments.push(results.data.comments);
                    } else {
                        $scope.childcomments = [results.data.comments];
                    }
                    $scope.comments.forEach(function(each){
                        if(each.displayCommentBox){
                            each.displayCommentBox = false;
                        }
                    });
                    $scope.comments = first.concat(results.data.comments);
                    $scope.commentBox = $scope.comments[$scope.comments.length -1];
                    $scope.commentBox.displayCommentBox = true;
                    $scope.comments  = $scope.comments.concat(second);
                } else {
                    $scope.comments.forEach(function(each){
                        if(each.displayCommentBox){
                            each.displayCommentBox = false;
                        }
                    });
                    comment.displayCommentBox = true;

                }
            });
        } else {
            $scope.expandedComments.splice($scope.expandedComments.indexOf(comment), 1);
            $scope.comments = $scope.comments.filter(function(commentToFilter){
                return (commentToFilter.level <= comment.level);
            });
            commentId = this.comment.id;
            angular.element('#'+commentId).removeClass("reveal-comments");
        }

    };
    $scope.bookmark = function(link){
        if ($scope.username == undefined) {
            console.log("Need to be logged in!");
            //display this error
            //save current window location so after the user logs in we can redirect them back here
            return;
        }
        if (!link.bookmarked) {
            console.log(link);
            $http.post('/bookmark',{
                username: $scope.username,
                link_id: link.id
            }).then(function(){
                console.log("successfully bookmarked");
                link.bookmarked = true;
            });
        } else {
            $http.post('/remove-bookmark',{
                username: $scope.username,
                link_id: link.id
            }).then(function(){
                console.log("successfully unbookmarked");
                link.bookmarked = false;
            });
        }
    };
};

homecontroller.$inject = ['$scope', '$http', '$rootScope', '$location', '$cookies'];
