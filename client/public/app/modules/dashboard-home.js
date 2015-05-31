angular.module('DashboardHome', ['ui.bootstrap'])

    .controller('DashboardHomeCtrl', function () {
        var vm = this;
        vm.data = {
            'username': 'Ana Bruma'
        };

    })
    .controller('PostsController', function ($http) {
        var vm = this;

        vm.itemsOnPage = 3;
        vm.currentPage = 1;
        vm.blogposts = [];

        var getBlogposts = function(page){
            $http.get(CONFIG.blogpost+'?page='+page)
                .success(function(response){
                    if(response.err){
                        vm.blogposts = [];
                        vm.totalItems = 0;
                    }
                    else{
                        vm.totalItems = response.result.lg;
                        vm.blogposts = response.result.arr;
                    }
                })
                .error(function(){
                    vm.blogposts = [];
                    vm.totalItems = 0;
                });

        };

        getBlogposts(vm.currentPage);

        vm.pageChanged = function () {
            getBlogposts(vm.currentPage);
        };
    });