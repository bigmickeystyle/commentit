var registercontroller = function($scope, $http){
    $scope.register = function(){
        var user = this.user;
        console.log(user);
        $http.post('/register', {
            user: user
        });
    };
};

uploadcontroller.$inject = ['$scope', '$http'];
