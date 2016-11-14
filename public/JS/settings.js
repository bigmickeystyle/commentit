var settingscontroller = function($scope, $http, $rootScope, $window, $cookies){
    $window.location.assign('/#/settings');
    $scope.username = $cookies.get("username");
    if ($scope.username == undefined) {
        $window.location.assign('/#/login');
    } else {
        $rootScope.username = $scope.username;
    }
    $scope.user = {
        username: $scope.username
    };
    $http.get('/user-settings', {
        params: {
            username: $scope.user.username
        }
    }).then(function(data){
        $scope.user = data.data.info;
    });
    $scope.edit = function(){
        $http.post('/edit-user', {
            info: $scope.user
        }).then(function(){
            console.log("successfully edited");
            //tell them it's been successfully submitted
        });
    };
};

settingscontroller.$inject = ['$scope', '$http', '$rootScope', '$window', '$cookies'];
