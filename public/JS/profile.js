var profilecontroller = function($scope, $http, $location){
    //change username to cookie value
    //look into database, based on username return all values for this form excpet password
    $scope.user = {
        username: 'karen'
    };
    console.log("scope");
    console.log($scope.user);
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

profilecontroller.$inject = ['$scope', '$http', '$location'];
