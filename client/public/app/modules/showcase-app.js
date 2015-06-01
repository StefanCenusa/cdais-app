angular.module('ShowcaseApp', ['ui.bootstrap'])

    .controller('ShowcaseCtrl', function ($rootScope, $location, $http, $modal, $window, $scope) {

        $scope.loggedIn = false;
        $scope.showLoginModal = false;
        $scope.showSignUpModal = false;
        $scope.toggleLoginModal = function () {
            $scope.showLoginModal = !$scope.showLoginModal;
        };

        $scope.toggleSignUpModal = function () {
            $scope.showSignUpModal = !$scope.showSignUpModal;
        };

        $scope.doLogin = function (loginType) {
            var vm = this;

            var Auth = {
                regular: function () {
                    var reqData = {
                        username: vm.user.username,
                        password: vm.user.pass
                    };

                    $http.post(CONFIG.login, JSON.stringify(reqData))
                        .success(function (data, status, header, config) {
                            console.log(data.result);
                            $scope.loggedIn = true;
                            $location.path('/dashboard');
                        })
                        .error(function (data, status, header, config) {
                            console.log(data);
                        });
                },
                signup: function () {
                    var reqData = {
                        email: vm.signup.email,
                        username: vm.signup.username,
                        password: vm.signup.pass,
                        firstName: vm.signup.firstname,
                        lastName: vm.signup.lastname
                    };

                    $http.post(CONFIG.signup, JSON.stringify(reqData))
                        .success(function (data, status, header, config) {
                            console.log(data.result);
                        })
                        .error(function (data, status, header, config) {
                            console.log(status);
                        });
                }
            };

            switch (loginType) {
                case 'regular':
                    Auth.regular();
                    break;
                case 'signup':
                    Auth.signup();
                    break;
            }
        };
    })

    .directive('modal', function ($rootScope) {
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
    });