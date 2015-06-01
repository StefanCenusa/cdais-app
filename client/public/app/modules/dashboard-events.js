angular.module('DashboardEvents', ['ui.calendar', 'ui.bootstrap'])

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

    .controller('DashboardEventsCalendarCtrl', function CalendarCtrl($scope,$http,$compile,uiCalendarConfig) {
        var date = new Date();
        var minute = date.getMinutes(),
            hour = date.getHours(),
            day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();

        /*$scope.changeTo = 'Hungarian';

        *//* event source that pulls from google.com *//*
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };*/

        /* event source that contains custom events on the scope */
        /*$http.get('dashboard-events.json').success(function(data) {
         $scope.events = data;
         *//*$scope.artistOrder = 'name';*//*
         });*/
        $scope.events = [];
        $scope.events = [
            {
                name: "Last Week",
                loc: "Iasi",
                start: new Date(year, month, day-7),
                relTime: ""
            },
            {
                name: "Three Days Ago",
                loc: "Iasi",
                start: new Date(year, month, day - 3, 12, 0),
                end: new Date(year, month, day - 2, 18, 0),
                allDay: false,
                relTime: ""
            },
            {
                name: "Yesterday",
                loc: "Bacau",
                start: new Date(year, month, day - 1, 16, 0),
                allDay: false,
                relTime: ""
            },
            {
                name: "In 1h and a half",
                loc: "Botosani",
                start: new Date(year, month, day, hour+1, minute+30),
                allDay: false,
                relTime: ""
            },
            {
                name: "Tomorrow at Seven",
                loc: "Iasi",
                start: new Date(year, month, day + 1, 19, 0),
                end: new Date(year, month, day + 1, 22, 30),
                allDay: false,
                relTime: ""
            },
            {
                name: "Four Days From Now",
                loc: "Botosani",
                start: new Date(year, month, day + 4, 16, 0),
                allDay: false,
                relTime: ""
            },
            {
                name: "On the 5th this Month",
                loc: "Nicolina",
                start: new Date(year, month, 5),
                end: new Date(year, month, 7),
                relTime: ""
            },
            {
                name: "On the 5th next Month",
                loc: "Nicolina",
                start: new Date(year, month+1, 5),
                end: new Date(year, month+1, 7),
                relTime: ""
            }
        ];

        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{name: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
            callback(events);
        };

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                {type:'party',name: 'Lunch',start: new Date(year, month, day, 12, 0),end: new Date(year, month, day, 14, 0),allDay: false},
                {type:'party',name: 'Lunch 2',start: new Date(year, month, day, 12, 0),end: new Date(year, month, day, 14, 0),allDay: false},
                {type:'party',name: 'Click for Google',start: new Date(year, month, 28),end: new Date(year, month, 29),url: 'http://google.com/'}
            ]
        };

        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){
            $scope.alertMessage = ('Subscribed to "' + date.name + '"');
        };

        /* alert on Drop */
        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };

        /* alert on Resize */
        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };

        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources,source) {
            var canAdd = 0;
            angular.forEach(sources,function(value, key){
                if(sources[key] === source){
                    sources.splice(key,1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };

        /* add custom event*/
        $scope.addEvent = function() {
            $scope.events.push({
                name: 'Open Sesame',
                start: new Date(year, month, 28),
                end: new Date(year, month, 29),
                className: ['openSesame']
            });
        };

        /* remove event */
        $scope.remove = function(index) {
            $scope.events.splice(index,1);
        };

        /* Change View */
        $scope.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };

        /* Change View */
        $scope.renderCalender = function(calendar) {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };

        /* Render Tooltip */
        $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.name,
                'tooltip-append-to-body': true});
            $compile(element)($scope);
        };

        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: false,
                header:{
                    left: 'name',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };

        $scope.changeLang = function() {
            if($scope.changeTo === 'Romanian'){
                $scope.uiConfig.calendar.dayNames = ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"];
                $scope.uiConfig.calendar.dayNamesShort = ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sam"];
                $scope.changeTo= 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Romanian';
            }
        };

        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];


        //--------- My-Events -----------

        /* relative time construct*/
        function relativeTime(){
            $scope.events.forEach(function(event){
                event.relTime = moment(event.start).fromNow().toString();
            });
        }
        relativeTime();

        /* nr of events limit*/
        var nrMaxEvents = 10;

        /* Future events */
        function futureEv(nrMaxEvents){
            var now = new Date();
            var fe = [];
            var evCounter = 0;

            $scope.events.forEach(function(event){
                if(event.start >  now && evCounter < nrMaxEvents){
                    fe.push(event);
                    evCounter++;
                }});
            return fe;
        }

        $scope.futureEvents = [];
        $scope.futureEvents = futureEv(nrMaxEvents);
        $scope.futureEvents.sort(function(eventA, eventB){
            return eventA.start-eventB.start;
        });

        /* Past events */
        function pastEv(nrMaxEvents){
            var now = new Date();
            var pe = [];
            var evCounter = 0;

            $scope.events.forEach(function(event){
                if(event.start <  now && evCounter < nrMaxEvents){
                    pe.push(event);
                    evCounter++;
                }});
            return pe;
        }

        $scope.pastEvents = [];
        $scope.pastEvents = pastEv(nrMaxEvents);
        $scope.pastEvents.sort(function(eventA, eventB){
            return eventB.start-eventA.start;
        });

        /* Next event*/
        $scope.nextEvent = $scope.futureEvents[0];
    });