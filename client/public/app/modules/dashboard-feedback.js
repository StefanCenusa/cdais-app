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

    .controller('DashboardFeedbackTrainerCtrl', ['$scope', function ($scope) {
        $scope.roles = ["G1", "G2", "G3", "GR", "O1", "O2", "O3", "OR"];
        $scope.debaters = [
            {
                name: "Ana"
            },
            {
                name: "Mihai"
            },
            {
                name: "Georgiana"
            },
            {
                name: "Ilinca"
            },
            {
                name: "Vlad"
            },
            {
                name: "Irina"
            },
            {
                name: "Ruxandra"
            },
            {
                name: "Marghioala"
            }
        ]
    }])

    .controller('DashboardFeedbackDebaterCtrl', function ($scope) {
        $scope.feedbacks = [
            {
                date: new Date(2015, 2, 20),
                trainer: "Cezar",
                position: "G2",
                score: 71,
                feedback: "Good job!"
            },
            {
                date: new Date(2015, 1, 10),
                trainer: "Marian",
                position: "O1",
                score: 70,
                feedback: "Could be better!"
            },
            {
                date: new Date(2015, 3, 5),
                trainer: "Stefan",
                position: "G1",
                score: 73,
                feedback: "GG!"
            },
            {
                date: new Date(2015, 3, 20),
                trainer: "Andrei",
                position: "O3",
                score: 69,
                feedback: "Ana Bruma!"
            },
            {
                date: new Date(2015, 2, 20),
                trainer: "Stefana",
                position: "O2",
                score: 71,
                feedback: "Ok!"
            }
        ];
        $scope.predicate = '-date';
    });



