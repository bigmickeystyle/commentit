var homecontroller = function($scope, $http){
    console.log("homecontroller");
    $scope.links = [example, example, example, example];
    $scope.showComments = function(){
        console.log(this);
        $scope.picture = this.link.picture;
    };
};

var example = {
    thumbnail: "public/images/logo.png",
    url: "http://www.theguardian.com/us-news/live/2016/nov/07/us-election-donald-trump-hillary-clinton-live",
    headline: "US election: final campaign day – as it happened",
    description: "Follow live updates on the final day in the US presidential campaign",
    picture: "https://i.guim.co.uk/img/media/e48c0474914ca4d4293ce35ed216ca67a498c48b/0_183_3000_1800/3000.jpg?w=620&q=55&auto=format&usm=12&fit=max&s=1229aa989b800cf7fc9e1128d4ef6d20"
};

var example2 = {


};
homecontroller.$inject = ['$scope', '$http'];
