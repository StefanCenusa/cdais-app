angular.module('mainCtrl', ['ui.bootstrap'])

    .controller('mainController', function($rootScope, $location, Auth, $modal, $window) {

        var vm = this;

        // get info if a person is logged in
        vm.loggedIn = Auth.isLoggedIn();

        // check to see if a user is logged in on every request
        $rootScope.$on('$routeChangeStart', function() {
            vm.loggedIn = Auth.isLoggedIn();

            // get user information on page load
            Auth.getUser()
                .then(function(data) {
                    vm.user = data.data.result;
                });
        });

        // function to handle logging out
        vm.doLogout = function() {
            Auth.logout();
            vm.user = '';

            $window.location.reload();
        };

        vm.open = function (){
            var modalInstance = $modal.open({
                templateUrl: 'app/views/modals/login.html',
                backdrop: true,
                windowClass: 'modal',
                controller: 'LoginModalController',
                controllerAs: 'loginModal',
                resolve: {}
            });
        }


    })
    .controller('LoginModalController', function($modalInstance, Auth, $location){
        var vm = this;

        vm.close = function () {
            $modalInstance.dismiss('cancel');
        };

        // function to handle login form
        vm.doLogin = function() {
            vm.processing = true;

            // clear the error
            vm.error = '';

            Auth.login(vm.user.username, vm.user.password)
                .success(function(data) {
                    vm.processing = false;

                    // if a user successfully logs in, redirect to users page
                    if (data.success) {
                        $modalInstance.dismiss('cancel');
                        $location.path('/dashboard');
                    }
                    else
                        vm.error = data.message;

                });
        };

    });
