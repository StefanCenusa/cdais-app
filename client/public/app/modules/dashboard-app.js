angular.module('DashboardApp', ['ui.bootstrap', 'DashboardHome', 'DashboardProfile', 'DashboardEvents', 'DashboardLearn', 'DashboardFeedback', 'DashboardPost'])

    .controller('DashboardCtrl', function ($scope, Auth, AuthToken, $state, $http, $rootScope) {
        // function to handle logging out
        $scope.doLogout = function () {
            Auth.logout();
            $state.go("showcase")
        };

        var token = AuthToken.getToken();

        $scope.formatDate = function (date) {
            return moment(date).format('MMMM Do YYYY, h:mm a');
        };
        $scope.formatText = function (text) {
            if (text.length > 80) {
                var res = text.substring(0, 80) + '...';
                return res;
            }
            return text;
        };

        $http.get(CONFIG.user + '?token=' + token)
            .success(function (data) {
                if (!data.err) {
                    $rootScope.user = data.result;
                }
            });

        $scope.notifications = [];
        setInterval(function () {
            $http.get(CONFIG.user + '/notifications?token=' + token + '&unread=true')
                .success(function (res) {
                    $scope.notifications = res.result;
                });
        }, 2000);


        $scope.setNotificationsClass = function () {
            if ($scope.notifications.length) {
                return 'red';
            }
            return '';
        };

        $scope.viewNotifications = function () {
            $http.get(CONFIG.user + '/notifications?token=' + token + '&readall=true')
                .success(function (res) {
                    $scope.notifications = [];
                });
        }

    });


