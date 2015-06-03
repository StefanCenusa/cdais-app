angular.module('DashboardLearn',['ui.bootstrap'])
    .service('helperService', function () {
        this.hello = function () {
            return "Hello World";
        };
        this.toBool = function (val) {
            if (val == 'undefined' || val == null || val == '' || val == 'false' || val == 'False')
                return false;
            else if (val == true || val == 'true' || val == 'True')
                return true;
            else
                return 'unidentified';
        };
        this.shuffle = function (array) {
            var currentIndex = array.length, temp, randomIndex;

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temp = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temp;
            }
            return array;
        }
        this.extend = function (out) {
            out = out || {};

            for (var i = 1; i < arguments.length; i++) {
                if (!arguments[i])
                    continue;

                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key))
                        out[key] = arguments[i][key];
                }
            }
            return out;
        };
    })

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
                title: 'Lesson 1',
                content: '...',
                photos: "http://www.google.com/intl/en_ALL/images/logo.gif"

            },
            {
                title: 'Lesson 2',
                content: '...',
                photos: "http://www.google.com/intl/en_ALL/images/logo.gif"

            }
        ];

        $scope.ws = [
            {
                title: 'Lesson 1',
                content: 'WS Group Body - 1',
                photo: 'http://feelgrafix.com/data_images/out/10/839214-landscape-sunset.jpg'
            },
            {
                title: 'Lesson 2',
                content: '...',
                photos: "http://www.google.com/intl/en_ALL/images/logo.gif"

            }
        ];

        $scope.others = [
            {
                title: 'Lesson 1',
                content: '...',

                photos: "http://www.google.com/intl/en_ALL/images/logo.gif"
            },
            {
                title: 'Lesson 2',
                content: '...',
                photos: "http://www.google.com/intl/en_ALL/images/logo.gif"
            }
        ];

        $scope.items = [];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        //$scope.quizName = 'test.json';
        //
        //$scope.defaultConfig = {
        //    'allowBack': true,
        //    'allowReview': true,
        //    'autoMove': false,  // if true, it will move to next question automatically when answered.
        //    'duration': 0,  // indicates the time in which quiz needs to be completed. post that, quiz will be automatically submitted. 0 means unlimited.
        //    'pageSize': 1,
        //    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
        //    'richText': false,
        //    'shuffleQuestions': false,
        //    'shuffleOptions': false,
        //    'showClock': false,
        //    'showPager': true,
        //    'theme': 'none'
        //}
        //
        //$scope.goTo = function (index) {
        //    if (index > 0 && index <= $scope.totalItems) {
        //        $scope.currentPage = index;
        //        $scope.mode = 'quiz';
        //    }
        //}
        //
        //$scope.onSelect = function (question, option) {
        //    if (question.QuestionTypeId == 1) { //
        //        question.Options.forEach(function (element, index, array) {
        //            if (element.Id != option.Id) {
        //                element.Selected = false;
        //                question.Answered = element.Id;
        //            }
        //        });
        //    }
        //
        //    if ($scope.config.autoMove == true && $scope.currentPage < $scope.totalItems)
        //        $scope.currentPage++;
        //}
        //
        //$scope.onSubmit = function () {
        //    var answers = [];
        //    $scope.questions.forEach(function (q, index) {
        //        answers.push({ 'QuizId': $scope.quiz.Id, 'QuestionId': q.Id, 'Answered': q.Answered });
        //    });
        //    // Post your data to the server here. answers contains the questionId and the users' answer.
        //    //$http.post('api/Quiz/Submit', answers).success(function (data, status) {
        //    //    alert(data);
        //    //});
        //    //console.log(answers);
        //    console.log($scope.questions);
        //    $scope.mode = 'result';
        //}
        //
        //$scope.pageCount = function () {
        //    return Math.ceil($scope.questions.length / $scope.itemsPerPage);
        //};
        //
        //var jsonFile = require('test.json');
        //
        //$scope.quiz = jsonFile.quiz;
        //$scope.config = helper.extend({}, $scope.defaultConfig, jsonFile.config);
        //$scope.questions = $scope.config.shuffleQuestions ? helper.shuffle(jsonFile.questions) : jsonFile.questions;
        //$scope.totalItems = $scope.questions.length;
        //$scope.itemsPerPage = $scope.config.pageSize;
        //$scope.currentPage = 1;
        //$scope.mode = 'quiz';
        //
        //$scope.$watch('currentPage + itemsPerPage', function () {
        //    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
        //        end = begin + $scope.itemsPerPage;
        //
        //    $scope.filteredQuestions = $scope.questions.slice(begin, end);
        //});
        //
        //$scope.isAnswered = function (index) {
        //    var answered = 'Not Answered';
        //    $scope.questions[index].Options.forEach(function (element, index, array) {
        //        if (element.Selected == true) {
        //            answered = 'Answered';
        //            return false;
        //        }
        //    });
        //    return answered;
        //};
        //
        //$scope.isCorrect = function (question) {
        //    var result = 'correct';
        //    question.Options.forEach(function (option, index, array) {
        //        if (helper.toBool(option.Selected) != option.IsAnswer) {
        //            result = 'wrong';
        //            return false;
        //        }
        //    });
        //    return result;
        //};

    })

    //.controller('quizCtrl', ['$scope', '$http', 'helperService', function ($scope, $http, helper) {
    //    $scope.quizName = 'test.json';
    //
    //    $scope.defaultConfig = {
    //        'allowBack': true,
    //        'allowReview': true,
    //        'autoMove': false,  // if true, it will move to next question automatically when answered.
    //        'duration': 0,  // indicates the time in which quiz needs to be completed. post that, quiz will be automatically submitted. 0 means unlimited.
    //        'pageSize': 1,
    //        'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    //        'richText': false,
    //        'shuffleQuestions': false,
    //        'shuffleOptions': false,
    //        'showClock': false,
    //        'showPager': true,
    //        'theme': 'none'
    //    }
    //
    //    $scope.goTo = function (index) {
    //        if (index > 0 && index <= $scope.totalItems) {
    //            $scope.currentPage = index;
    //            $scope.mode = 'quiz';
    //        }
    //    }
    //
    //    $scope.onSelect = function (question, option) {
    //        if (question.QuestionTypeId == 1) { //
    //            question.Options.forEach(function (element, index, array) {
    //                if (element.Id != option.Id) {
    //                    element.Selected = false;
    //                    question.Answered = element.Id;
    //                }
    //            });
    //        }
    //
    //        if ($scope.config.autoMove == true && $scope.currentPage < $scope.totalItems)
    //            $scope.currentPage++;
    //    }
    //
    //    $scope.onSubmit = function () {
    //        var answers = [];
    //        $scope.questions.forEach(function (q, index) {
    //            answers.push({ 'QuizId': $scope.quiz.Id, 'QuestionId': q.Id, 'Answered': q.Answered });
    //        });
    //        // Post your data to the server here. answers contains the questionId and the users' answer.
    //        //$http.post('api/Quiz/Submit', answers).success(function (data, status) {
    //        //    alert(data);
    //        //});
    //        //console.log(answers);
    //        console.log($scope.questions);
    //        $scope.mode = 'result';
    //    }
    //
    //    $scope.pageCount = function () {
    //        return Math.ceil($scope.questions.length / $scope.itemsPerPage);
    //    };
    //
    //    var jsonFile = require('test.json');
    //
    //    $scope.quiz = jsonFile.quiz;
    //    $scope.config = helper.extend({}, $scope.defaultConfig, jsonFile.config);
    //    $scope.questions = $scope.config.shuffleQuestions ? helper.shuffle(jsonFile.questions) : jsonFile.questions;
    //    $scope.totalItems = $scope.questions.length;
    //    $scope.itemsPerPage = $scope.config.pageSize;
    //    $scope.currentPage = 1;
    //    $scope.mode = 'quiz';
    //
    //    $scope.$watch('currentPage + itemsPerPage', function () {
    //        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
    //            end = begin + $scope.itemsPerPage;
    //
    //        $scope.filteredQuestions = $scope.questions.slice(begin, end);
    //    });
    //
    //    $scope.isAnswered = function (index) {
    //        var answered = 'Not Answered';
    //        $scope.questions[index].Options.forEach(function (element, index, array) {
    //            if (element.Selected == true) {
    //                answered = 'Answered';
    //                return false;
    //            }
    //        });
    //        return answered;
    //    };
    //
    //    $scope.isCorrect = function (question) {
    //        var result = 'correct';
    //        question.Options.forEach(function (option, index, array) {
    //            if (helper.toBool(option.Selected) != option.IsAnswer) {
    //                result = 'wrong';
    //                return false;
    //            }
    //        });
    //        return result;
    //    };
    //}]);
    