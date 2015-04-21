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
                controller: "DashboardCtrl",
                controllerAs: "dashboardCtrl"
            })

            .state('dashboard.home', {
                url: "/home",
                templateUrl: "app/views/pages/dashboard.home.html",
                controller: 'DashboardHomeCtrl',
                controllerAs: 'dashboardHomeCtrl'
            })

            .state('dashboard.profile', {
                url: "/profile",
                templateUrl: "app/views/pages/dashboard.profile.html",
                controller: 'DashboardProfileCtrl'
            })
            .state('dashboard.profile.user', {
                url: "/user",
                templateUrl: "app/views/pages/dashboard.profile.user.html"
            })
            .state('dashboard.profile.results', {
                url: "/results",
                templateUrl: "app/views/pages/dashboard.profile.results.html"
            })
            .state('dashboard.profile.progress', {
                url: "/progress",
                templateUrl: "app/views/pages/dashboard.profile.progress.html"
            })

            .state('dashboard.events', {
                url: "/events",
                templateUrl: "app/views/pages/dashboard.events.html",
                controller: 'DashboardEventsCtrl'
            })
            .state('dashboard.events.calendar', {
                url: "/calendar",
                templateUrl: "app/views/pages/dashboard.events.calendar.html"
                //controller: 'DashboardEventsCalendarCtrl'
            })
            .state('dashboard.events.my-events', {
                url: "/my-events",
                templateUrl: "app/views/pages/dashboard.events.my_events.html"
                //controller: 'DashboardEventsMy_EventsCtrl'
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
            .state('dashboard.feedback.trainer', {
                url: "/trainer",
                templateUrl: "app/views/pages/dashboard.feedback.trainer.html"
                //controller: 'DashboardFeedbackTrainerCtrl'
            })
            .state('dashboard.feedback.debater', {
                url: "/debater",
                templateUrl: "app/views/pages/dashboard.feedback.debater.html"
                //controller: 'DashboardFeedbackDebaterCtrl'
            })

            .state('dashboard.post', {
                url: "/post",
                templateUrl: "app/views/pages/dashboard.post.html",
                controller: 'DashboardPostCtrl'
            });

        $locationProvider.html5Mode(true);
    });