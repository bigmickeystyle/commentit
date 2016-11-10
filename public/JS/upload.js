var uploadcontroller = function($scope, $http, $location, $cookies) {
    if (!$cookies.get("username")) {
        $location.path('/login');
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
            $scope.parsed = true;
            $scope.loading = false;
        });
    };
    // create the handlers for the angular
    $scope.edit = function(){
        $scope.editing = true;
    };
    $scope.submit = function(){
        // splitTags($scope.parsed_info.original_tags);
        $http({
            url: '/save/link',
            method: 'POST',
            params: $scope.parsed_info
        }).then(function(){
            $scope.editing = false;
            $scope.saved = true;
        });
    };
};

uploadcontroller.$inject = ['$scope', '$http', '$location', '$cookies'];
