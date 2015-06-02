angular.module('DashboardPost', ['ui.bootstrap', 'textAngular'])

    .controller('DashboardPostCtrl', function ($scope, $http, $location, AuthToken) {

        var token = AuthToken.getToken();

        $scope.preview = false;
        
        $scope.uploadBlogpost = function(){
            var body = {
                title: $scope.blogpost.title,
                content: $scope.blogpost.htmlcontent,
                created_byID: $scope.user._id
            };

            $http({method: 'POST', url: CONFIG.blogpost + '?token=' + token, data: body})
                .success(function(data){
                    $location.path('/dashboard/home');
                })
                .error(function (error) {
                    $scope.status = 'Unable to connect' + error.message;
                });
            console.log($scope.htmlcontent);
        };

        $scope.previewBlogpost = function(){
            $scope.preview = !$scope.preview
        }
    });
