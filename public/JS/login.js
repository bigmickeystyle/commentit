var logincontroller = function($scope, $http, $location){
    $scope.login = function(){
        var user = this.user;
        console.log(user);
        $http.post('/login', {
            user: user
        }).success(function(){
            $location.path('/home');
        });
    };
};

logincontroller.$inject = ['$scope', '$http', '$location'];
