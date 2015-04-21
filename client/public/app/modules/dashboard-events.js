    angular.module('DashboardEvents', ['ui.bootstrap'])

    .controller('DashboardEventsCtrl', function ($scope, $state, $location) {
        if ($state.current.name == "dashboard.events")
            $state.go("dashboard.events.calendar");
        switch($state.current.name){
            case "dashboard.events.calendar":
                $scope.events = {calendar: true, my_events: false};
                break;
            case "dashboard.events.my_events":
                $scope.events = {calendar: false, my_events: true};
                break;
        }
    })

    .controller('DashboardEventsCalendarCtrl', function () {

    })

    .controller('DashboardEventsMy_EventsCtrl', function () {

    });