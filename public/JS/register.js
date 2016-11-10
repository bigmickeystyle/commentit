var registercontroller = function($scope, $http, $location, $cookies){
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

registercontroller.$inject = ['$scope', '$http', '$location', '$cookies'];
