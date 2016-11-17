var bookmarkscontroller = function($scope, $state, $stateParams, $http, $rootScope, $window, $cookies){
    var user = $stateParams.user;
    $window.location.assign('/#/bookmarks/' + user);

    $scope.username = $cookies.get("username");
    if ($scope.username){
        $rootScope.username = $scope.username;
    }
    $scope.username = user;

    $http.get('/user_bookmarks', {
        params: {
            loggedin: $rootScope.username,
            username: user
        }
    }).success(function(data){
        $scope.links = data.links;
        $scope.change = "bookmarks";
    });
};

bookmarkscontroller.$inject = ['$scope', '$state', '$stateParams', '$http', '$rootScope', '$window', '$cookies'];
