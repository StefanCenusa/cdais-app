angular.module('DashboardHome', ['ui.bootstrap'])

    .controller('DashboardHomeCtrl', function () {
        var vm = this;
        vm.data = {
            'username': 'Ana Bruma'
        };

    })
    .controller('PostsController', function(){
        var vm = this;
        vm.posts = [];

        vm.itemsOnPage = 3;
        vm.currentPage = 1;

        vm.totalItems=0;

        vm.pageChanged = function() {

        };
    });