angular.module('app.routes', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider){

        // For any unmatched url, send to /route1
        $urlRouterProvider.otherwise("/");
        $urlRouterProvider.when("/dashboard", "/dashboard/home");

        $stateProvider
            .state('showcase', {
                url: "/",
                templateUrl: "app/views/pages/showcase.html",
                controller: 'ShowcaseCtrl',
                controllerAs: 'showcaseCtrl'
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "app/views/pages/dashboard.html",
                controller: "DashboardCtrl"
            })
            .state('dashboard.home', {
                url: "/home",
                templateUrl: "app/views/pages/dashboard.home.html",
                controller: 'DashboardHomeCtrl'
            })
            .state('dashboard.profile', {
                url: "/profile",
                templateUrl: "app/views/pages/dashboard.profile.html",
                controller: 'DashboardProfileCtrl'
            })
            .state('dashboard.events', {
                url: "/events",
                templateUrl: "app/views/pages/dashboard.events.html",
                controller: 'DashboardEventsCtrl'
            })
            .state('dashboard.learn', {
                url: "/learn",
                templateUrl: "app/views/pages/dashboard.learn.html",
                controller: 'DashboardLearnCtrl'
            })
            .state('dashboard.feedback', {
                url: "/feedback",
                templateUrl: "app/views/pages/dashboard.feedback.html",
                controller: 'DashboardFeedbackCtrl'
            })
            .state('dashboard.post', {
                url: "/post",
                templateUrl: "app/views/pages/dashboard.post.html",
                controller: 'DashboardPostCtrl'
            });

        $locationProvider.html5Mode(true);
    });