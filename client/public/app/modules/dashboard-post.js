angular.module('DashboardPost', ['ui.bootstrap', 'textAngular'])

    .controller('DashboardPostCtrl', function ($scope, $http, $location) {

        $scope.preview = false;
        
        $scope.uploadBlogpost = function(){
            //upload to server.
            $http.post('/api/post', $scope.htmlcontent)
                .success(function(data){
                    $location.path('/');
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
