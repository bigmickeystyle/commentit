var uploadcontroller = function($scope, $state, $stateParams, $http, $rootScope, $window, $location, $cookies) {
    $window.location.assign('/#/upload');
    $scope.username = $cookies.get("username");
    if ($scope.username == undefined) {
        $window.location.assign('/#/login');
    } else {
        $rootScope.username = $scope.username;
    }
    $scope.parsed = false;
    $scope.loading = false;
    $scope.parse = function(){
        $scope.loading = true;
        var page = this;
        $http({
            url: '/parse',
            method: 'POST',
            params: {
                'url': page.link.url
            }
        }).then(function(parsed_info){
            if (parsed_info.data.message) {
                console.log(parsed_info.data.message);
                $scope.message = parsed_info.data.message;
                $scope.parsed = true;
                $scope.loading = false;
                return;
            }
            var details = parsed_info.data.info;
            $scope.parsed_info = details;
            if (!$scope.parsed_info.thumbnail){
                $scope.parsed_info.thumbnail = './public/images/logo.png';
            }
            $scope.parsed_info.original_tags = page.link.tags;
            var tags = $scope.parsed_info.original_tags;
            if (tags) {
                if (tags.search(",") == -1) {
                    $scope.parsed_info.tags = [tags];
                } else {
                    tags = tags.split(",");
                    $scope.parsed_info.tags = tags.map(function(elem){
                        return elem.trim();
                    });
                }
            } else {
                $scope.parsed_info.tags = [];
            }
            $scope.parsed_info.username = $scope.username;
            $scope.parsed = true;
            $scope.loading = false;
        });
    };
    // create the handlers for the angular
    $scope.edit = function(){
        $scope.editing = true;
    };
    $scope.submit = function(){
        $scope.parsed_info.username = $scope.username;
        $http({
            url: '/save/link',
            method: 'POST',
            params: $scope.parsed_info
        }).then(function(){
            $scope.editing = false;
            $scope.saved = true;
        });
    };
    $scope.reload = function(){
        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    };
};

uploadcontroller.$inject = ['$scope', '$state', '$stateParams', '$http', '$rootScope', '$window', '$location', '$cookies'];
