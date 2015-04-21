angular.module('DashboardFeedback', ['ui.bootstrap'])

    .controller('DashboardFeedbackCtrl', function ($scope, $state, $location) {
        if ($state.current.name == "dashboard.feedback")
            $state.go("dashboard.feedback.trainer");
        switch($state.current.name){
            case "dashboard.feedback.trainer":
                $scope.trainer = {trainer: true, debater: false};
                break;
            case "dashboard.feedback.debater":
                $scope.trainer = {trainer: false, debater: true};
                break;
        }
    })

    .controller('DashboardFeedbackTrainerCtrl', function () {

    })

    .controller('DashboardFeedbackDebaterCtrl', function () {

    });



