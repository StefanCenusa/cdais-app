angular.module('app.routes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'app/views/pages/showcase.html',
                controller  : 'mainController',
                controllerAs: 'main'
            })

            // login page
            .when('/dashboard', {
                templateUrl : 'app/views/pages/dashboard.html'
            });

        $locationProvider.html5Mode(true);

    });