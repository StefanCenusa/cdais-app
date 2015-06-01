angular.module('ShowcaseApp', ['ui.bootstrap'])

    .controller('ShowcaseCtrl', function ($rootScope, $location, Auth, $modal, $window, $scope) {

        $scope.loggedIn = false;
        $scope.showModal = false;
        $scope.toggleModal = function () {
            $scope.showModal = !$scope.showModal;
        };

    })

    .directive('modal', function () {
        return {
            template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function (value) {
                    if (value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    })

    .controller('LoginModalController', function ($modalInstance, Auth, $location) {
        var vm = this;

        vm.close = function () {
            $modalInstance.dismiss('cancel');
        };

        // function to handle login form
        vm.doLogin = function (loginType) {
            vm.processing = true;

            // clear the error
            vm.error = '';
            switch (loginType) {
                case 'regular':
                    Auth.
                        login(vm.user.username, vm.user.password)
                        .success(function (data) {
                            vm.processing = false;

                            // if a user successfully logs in, redirect to users page
                            if (data.success) {
                                $modalInstance.dismiss('cancel');
                                $location.path('/dashboard');
                            }
                            else
                                vm.error = data.message;

                        });
                    break;
                case 'google':
                    Auth.
                        googleLogin()
                        .success(function (data) {
                            vm.processing = false;

                            // if a user successfully logs in, redirect to users page
                            if (data.success) {
                                $modalInstance.dismiss('cancel');
                                $location.path('/dashboard');
                            }
                            else
                                vm.error = data.message;

                        });
                    break;
                case 'facebook':
                    Auth.
                        facebookLogin()
                        .success(function (data) {
                            vm.processing = false;

                            // if a user successfully logs in, redirect to users page
                            if (data.success) {
                                $modalInstance.dismiss('cancel');
                                $location.path('/dashboard');
                            }
                            else
                                vm.error = data.message;

                        });
            }
        };

    });
