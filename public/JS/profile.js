var profilecontroller = function($scope, $stateParams, $http, $rootScope, $window, $cookies){
    var user = $stateParams.user;
    $window.location.assign('/#/profile/' + user);
    $scope.username = $cookies.get("username");
    if ($scope.username){
        $rootScope.username = $scope.username;
    }
    $scope.links = true;
};

profilecontroller.$inject = ['$scope', '$stateParams', '$http', '$rootScope', '$window', '$cookies'];
