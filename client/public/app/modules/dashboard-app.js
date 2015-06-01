angular.module('DashboardApp', ['ui.bootstrap', 'DashboardHome', 'DashboardProfile', 'DashboardEvents', 'DashboardLearn', 'DashboardFeedback', 'DashboardPost'])

    .controller('DashboardCtrl', function (Auth, $state) {
        var vm = this;
        // function to handle logging out
        vm.doLogout = function () {
            Auth.logout();
            vm.user = '';

            $state.go("showcase")
        };

    });


