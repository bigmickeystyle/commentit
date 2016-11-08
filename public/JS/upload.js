var uploadcontroller = function($scope, $http) {
    $scope.parsed = false;
    $scope.parse = function(){
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
            $scope.parsed_info.original_tags = page.link.tags;
            splitTags($scope.parsed_info.original_tags);
            $scope.parsed = true;
        });
    };
    // create the handlers for the angular
    $scope.edit = function(){
        $scope.editing = true;
    };
    $scope.submit = function(){
        splitTags($scope.parsed_info.original_tags);
        $http({
            url: '/save/link',
            method: 'POST',
            params: $scope.parsed_info
        }).then(function(){
            $scope.editing = false;
            $scope.saved = true;
        });
    };
    function splitTags(tags){
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
    }
};

uploadcontroller.$inject = ['$scope', '$http'];
