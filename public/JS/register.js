var registercontroller = function($scope, $http, $rootScope, $window, $location, $cookies){
    $window.location.assign('/#/register');
    $scope.username = $cookies.get("username");
console.log($scope.username);
    if ($scope.username != undefined) {
        $window.location.assign('/#/profile');
    }
    $scope.register = function(){
        var user = this.user;
        $http.post('/register', {
            user: user
        }).then(function(info){
            if (info.data.success) {
                $scope.message = undefined;
                $cookies.put("username", user.username);
                $rootScope.username = user.username;
                $location.path('/profile');
            } else {
                $scope.message = info.data.message;
            }
        });
    };
};

registercontroller.$inject = ['$scope', '$http', '$rootScope', '$window', '$location', '$cookies'];
