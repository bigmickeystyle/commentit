var registercontroller = function($scope, $http, $window, $location, $cookies){
    $window.location.assign('/#/register');
    $scope.username = $cookies.get("username");
    if ($scope.username != undefined) {
        $window.location.assign('/#/profile');
    }
    $scope.register = function(){
        var user = this.user;
        $http.post('/register', {
            user: user
        }).then(function(){
            $cookies.put("username", user.username);
            $location.path('/profile');
        });
    };
};

registercontroller.$inject = ['$scope', '$http', '$window', '$location', '$cookies'];
