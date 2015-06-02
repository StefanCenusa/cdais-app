angular.module('DashboardApp', ['ui.bootstrap', 'DashboardHome', 'DashboardProfile', 'DashboardEvents', 'DashboardLearn', 'DashboardFeedback', 'DashboardPost'])

    .controller('DashboardCtrl', function ($scope, Auth, AuthToken, $state, $http) {
        // function to handle logging out
        $scope.doLogout = function () {
            Auth.logout();
            $state.go("showcase")
        };

        var token = AuthToken.getToken();

        $http.get(CONFIG.user+'?token='+token)
            .success(function(data){
                if (!data.err){
                    $scope.user = data.result;
                    $scope.notifications = [];
                    $http.get(CONFIG.user+'/notifications?token='+token+'&unread=true')
                        .success(function(res){
                            $scope.notifications=res.result;
                        });
                }
            });

    });


