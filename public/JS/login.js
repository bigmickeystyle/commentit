var logincontroller = function($scope, $http, $location, $cookies){
    $scope.login = function(){
        var user = this.user;
        $http.post('/login', {
            user: user
        }).success(function(){
            $cookies.put("username", user.username);
            $location.path('/home');
        });
    };
};

logincontroller.$inject = ['$scope', '$http', '$location', '$cookies'];
