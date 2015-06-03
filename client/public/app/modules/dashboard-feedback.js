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

    .controller('DashboardFeedbackTrainerCtrl', ['$scope', '$http', 'AuthToken', function ($scope, $http, AuthToken) {
        $scope.roles = ["G1", "O1", "G2", "O2", "G3", "O3", "OR", "GR"];

        var token = AuthToken.getToken();

        $http.post(CONFIG.userList + '?token=' + token, { fields: ["firstName", "lastName", "username"]})
            .success(function(data){
                if (!data.err){
                    $scope.debatersData = data.result;

                    $scope.debaters = [];
                    for(var i = 0; i < $scope.debatersData.length; i++){
                        $scope.debaters.push($scope.debatersData[i].firstName + ' ' + $scope.debatersData[i].lastName);
                    }
                }
            });
    }])

    .controller('FormCtrl', function ($scope, $http) {

        var formData = {
            firstname: "default",
            emailaddress: "default"
        };

        $scope.save = function() {
            formData = $scope.form;
            console.log (formData);
        };

        $scope.submitForm = function() {
            console.log("posting data....");
            formData = $scope.form;
            console.log(formData);

            //$http.post('form.php', JSON.stringify(data)).success(function(){/*success callback*/});
        };

    })

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

        /* relative time construct*/
        function relativeTime(){
            $scope.feedbacks.forEach(function(feedback){
                feedback.relTime = moment(feedback.date).fromNow().toString();
            });
        }
        relativeTime();
    })

    .controller('RatingDemoCtrl', function ($scope) {
        $scope.rate = 1;
        $scope.max = 10;
        $scope.isReadonly = false;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];
    });