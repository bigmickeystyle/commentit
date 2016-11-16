var profilecontroller = function($scope, $state, $stateParams, $http, $rootScope, $window, $cookies){
    var user = $stateParams.user;
    $window.location.assign('/#/profile/' + user);

    $scope.username = $cookies.get("username");
    if ($scope.username){
        $rootScope.username = $scope.username;
    }
    $scope.username = user;

    $scope.countUpvotes = function(){
        $http.get('/upvotes', {
            params: {
                username: user
            }
        }).success(function(data){
            $scope.upvotes = data.upvotes[0].upvotes;
        });
    };
    $scope.countUpvotes();

    $scope.display = {};
    $scope.displayComments = function(){
        console.log("showComments");
        $scope.display.links = false;
        $scope.display.comments = true;
        $scope.display.upvotes = false;
        $http.get('/user_comments', {
            params: {
                loggedin: $rootScope.username,
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
        $scope.display.upvotes = false;
        $http.get('/user_links', {
            params: {
                loggedin: $rootScope.username,
                username: user
            }
        }).success(function(data){
            $scope.links = data.links;
            $scope.change = "links";
        });
    };
    $scope.displayUpvotes = function(){
        console.log("showUpvotes");
        $scope.display.links = false;
        $scope.display.comments = false;
        $scope.display.upvotes = true;
        $http.get('/user_upvotes', {
            params: {
                loggedin: $rootScope.username,
                username: user
            }
        }).success(function(data){
            $scope.links = data.links;
            $scope.change = "upvotes";
        });
    };

    $scope.displayLinks();
};

profilecontroller.$inject = ['$scope', '$state', '$stateParams', '$http', '$rootScope', '$window', '$cookies'];
