angular.module('DashboardHome', ['ui.bootstrap'])

    .controller('DashboardHomeCtrl', function () {
        var vm = this;
        vm.data = {
            'username': 'Ana Bruma'
        };

    })
    .controller('PostsController', function ($scope, $http) {

        $scope.itemsOnPage = 3;
        $scope.currentPage = 1;

        var getBlogposts = function(page){
            $http.get(CONFIG.blogpost+'?page='+page)
                .success(function(response){
                    if(response.err){
                        $scope.blogposts = [];
                        $scope.totalItems = 0;
                    }
                    else{
                        $scope.totalItems = response.result.lg;
                        $scope.blogposts = response.result.arr;
                    }
                })
                .error(function(){
                    $scope.blogposts = [];
                    $scope.totalItems = 0;
                });

        };

        getBlogposts($scope.currentPage);

        $scope.pageChanged = function () {
            getBlogposts($scope.currentPage);
        };
    });