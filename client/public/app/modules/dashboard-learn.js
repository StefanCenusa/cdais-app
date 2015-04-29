angular.module('DashboardLearn',['ui.bootstrap'])
    .controller('DashboardLearnCtrl', function ($scope, $state, $location) {
        if ($state.current.name == "dashboard.learn")
            $state.go("dashboard.learn.knowledge");
        switch($state.current.name){
            case "dashboard.learn.knowledge":
                $scope.learn = {knowledge: true, ws: false, others: false};
                break;
            case "dashboard.learn.ws":
                $scope.learn = {knowledge: false, ws: true, others: false};
                break;
            case "dashboard.learn.others":
                $scope.learn = {knowledge: false, ws: false, others: true};
                break;
        }

        $scope.oneAtATime = true;

        $scope.knowledge = [
            {
                title: 'Knowledge Group Header - 1',
                content: 'Knowledge Group Body - 1'
            },
            {
                title: 'Knowledge Group Header - 2',
                content: 'Knowledge Group Body - 2'
            }
        ];

        $scope.ws = [
            {
                title: 'WS Group Header - 1',
                content: 'WS Group Body - 1'
            },
            {
                title: 'WS Group Header - 2',
                content: 'WS Group Body - 2'
            }
        ];

        $scope.others = [
            {
                title: 'Others Group Header - 1',
                content: 'Others Group Body - 1'
            },
            {
                title: 'Others Group Header - 2',
                content: 'Others Group Body - 2'
            }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    });