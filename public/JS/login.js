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
        }).then(function(info){
            if (info.data.success) {
                $scope.message = undefined;
                $cookies.put("username", user.username);
                $rootScope.username = user.username;
                $location.path('/home');
            } else {
                $scope.message = info.data.message;
            }
        });
    };
};

logincontroller.$inject = ['$scope', '$http', '$rootScope', '$window', '$location', '$cookies'];
