var registercontroller = function($scope, $http, $location){
    $scope.register = function(){
        var user = this.user;
        $http.post('/register', {
            user: user
        }).then(function(){
            $location.path('/profile');
        });
    };
};

registercontroller.$inject = ['$scope', '$http', '$location'];
