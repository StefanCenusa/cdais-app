angular.module('ShowcaseApp', ['ui.bootstrap'])

    .controller('ShowcaseCtrl', function ($rootScope, $location, $http, $modal, $window, $scope, AuthToken, Auth) {

        var getUser = function () {
            return $http.get(CONFIG.user + '?token=' + AuthToken.getToken())
                .success(function (dataResult) {
                    $scope.loggedInUser = dataResult.result.username;
                })
                .error(function (data, status, header, config) {
                    console.log(data);
                })
        };

        $scope.user = {};
        $scope.signup = {};
        $scope.loggedIn = Auth.isLoggedIn();
        if ($scope.loggedIn)
            getUser();
        $scope.showLoginModal = false;
        $scope.showSignUpModal = false;
        $scope.toggleLoginModal = function () {
            $scope.showLoginModal = !$scope.showLoginModal;
        };


        $scope.toggleSignUpModal = function () {
            $scope.showSignUpModal = !$scope.showSignUpModal;
        };

        $scope.doLogout = function () {
            Auth.logout();
            $window.location.reload();
        };
        $scope.doLogin = function (loginType) {

            var Authentificate = {
                regular: function () {
                    Auth.
                        login($scope.user.username, $scope.user.pass)
                        .success(function (data) {
                            if (data.success) {
                                getUser();
                                $location.path('/dashboard');
                            }
                        })
                        .error(function (data) {
                            $scope.user.username = null;
                            $scope.user.pass = null;
                            swal('Fail to login!', "Invalid username or password", "error");
                        });
                },
                signup: function () {
                    var reqData = {
                        email: $scope.signup.email,
                        username: $scope.signup.username,
                        password: $scope.signup.pass,
                        firstName: $scope.signup.firstname,
                        lastName: $scope.signup.lastname
                    };

                    $http.post(CONFIG.signup, JSON.stringify(reqData))
                        .success(function (data, status, header, config) {
                            console.log(data.result);
                        })
                        .error(function (data, status, header, config) {
                            swal('Fail to singup!', "Invalid data", "error");
                        });
                },
                facebook: function(){
                    $window.open(CONFIG.facebook, "_self");
                },
                google: function(){
                    $window.open(CONFIG.google, "_self");
                },
                pocket: function(){
                    $window.open(CONFIG.pocket, "_self");
                }
            };

            switch (loginType) {
                case 'regular':
                    Authentificate.regular();
                    break;
                case 'signup':
                    Authentificate.signup();
                    break;
                case 'facebook':
                    Authentificate.facebook();
                    break;
                case 'google':
                    Authentificate.google();
                    break;
                case 'pocket':
                    Authentificate.pocket();
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