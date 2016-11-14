var logincontroller = function($scope, $http, $rootScope, $window, $location, $cookies){
    $window.location.assign('/#/login');
    $scope.username = $cookies.get("username");
    if ($scope.username != undefined) {
        $window.location.assign('/#/profile');
    }
    $scope.login = function(){
        var user = this.user;
        $http.post('/login', {
            user: user
        }).success(function(){
            $cookies.put("username", user.username);
            $rootScope.username = user.username;
            $location.path('/home');
        });
    };
};

logincontroller.$inject = ['$scope', '$http', '$rootScope', '$window', '$location', '$cookies'];
