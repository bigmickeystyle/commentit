var profilecontroller = function($scope, $stateParams, $http, $rootScope, $window, $cookies){
    var user = $stateParams.user;
    $window.location.assign('/#/profile/' + user);
    $scope.username = $cookies.get("username");
    if ($scope.username){
        $rootScope.username = $scope.username;
    }
    $scope.display = {};
    $scope.showComments = function(){
        $scope.display.links = false;
        $scope.display.comments = true;
        $scope.display.upvotes = false;
        $http.get('/user_comments', {
            params: {
                username: user
            }
        }).success(function(data){
            console.log("success!");
            console.log(data);
            $scope.links = data.links;
            $scope.showComments($scope.links[0]);
        });
    };
    $scope.showUpvotes = function(){
        $scope.display.links = false;
        $scope.display.comments = false;
        $scope.display.upvotes = true;
        $http.get('/user_upvotes', {
            params: {
                username: user
            }
        }).success(function(data){
            console.log("success!");
            console.log(data);
            $scope.links = data.links;
            $scope.showComments($scope.links[0]);
        });
    };
    $scope.showLinks = function(){
        $scope.display.links = true;
        $scope.display.comments = false;
        $scope.display.upvotes = false;
        $http.get('/user_links', {
            params: {
                username: user
            }
        }).success(function(data){
            console.log("success!");
            console.log(data);
            $scope.links = data.links;
            $scope.showComments($scope.links[0]);
        });
    };
    $scope.showLinks();
};

profilecontroller.$inject = ['$scope', '$stateParams', '$http', '$rootScope', '$window', '$cookies'];
