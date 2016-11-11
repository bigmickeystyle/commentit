var profilecontroller = function($scope, $http, $location, $cookies){
    //change username to cookie value
    //look into database, based on username return all values for this form excpet password
    var username = $cookies.get("username");
    if (!username) {
        $location.path('/login');
    }
    $scope.user = {
        username: username
    };
    $http.get('/profile', {
        params: {
            username: $scope.user.username
        }
    }).then(function(data){
        $scope.user = data.data.info;
    });
    $scope.edit = function(){
        $http.post('/profile', {
            info: $scope.user
        }).then(function(){
            console.log("successfully edited");
            //tell them it's been successfully submitted
        });
    };
};

profilecontroller.$inject = ['$scope', '$http', '$location', '$cookies'];
