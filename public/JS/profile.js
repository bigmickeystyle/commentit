var profilecontroller = function($scope, $state, $stateParams, $http, $rootScope, $window, $cookies){
    var user = $stateParams.user;
    $window.location.assign('/#/profile/' + user);
    $scope.username = $cookies.get("username");
    if ($scope.username){
        $rootScope.username = $scope.username;
    }

    $scope.countUpvotes = function(){
        $http.get('/upvotes', {
            params: {
                username: user
            }
        }).success(function(data){
            console.log("Final Upvote count");
            console.log(data.upvotes[0].upvotes);
            $scope.upvotes = data.upvotes[0].upvotes;
        });
    };
    $scope.countUpvotes();

    $scope.display = {};
    $scope.displayComments = function(){
        console.log("showComments");
        $scope.display.links = false;
        $scope.display.comments = true;
        $http.get('/user_comments', {
            params: {
                username: user
            }
        }).success(function(data){
            $scope.comments = data.comments;
            $scope.links = data.links;
            $scope.change = "comments";
        });
    };
    $scope.displayLinks = function(){
        console.log("showLinks");
        $scope.display.links = true;
        $scope.display.comments = false;
        $http.get('/user_links', {
            params: {
                username: user
            }
        }).success(function(data){
            $scope.links = data.links;
            $scope.change = "links";
        });
    };
    $scope.displayLinks();
};

profilecontroller.$inject = ['$scope', '$state', '$stateParams', '$http', '$rootScope', '$window', '$cookies'];
