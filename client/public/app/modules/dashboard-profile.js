angular.module('DashboardProfile', ['ui.bootstrap'])

    .controller('DashboardProfileCtrl', function ($scope, $state, $location) {
        if ($state.current.name == "dashboard.profile")
            $state.go("dashboard.profile.user");
        switch ($state.current.name) {
            case "dashboard.profile.user":
                $scope.profile = {user: true, results: false, progress: false};
                break;
            case "dashboard.profile.results":
                $scope.profile = {user: false, results: true, progress: false};
                break;
            case "dashboard.profile.progress":
                $scope.profile = {user: false, results: false, progress: true};
                break;

        }
    })

    .controller('ChartCtrl', function ($scope, $rootScope, $http, AuthToken) {
        var chart = null;
        var chartOptions = {
            chart: {
                renderTo: 'container',
                marginBottom: 70
            },
            legend: {
                enabled: true
            },
            credits: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            rangeSelector: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            yAxis: {
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },
            plotOptions: {
                line: {
                    animation: false,
                    marker: {
                        enabled: true,
                        radius: 3,
                        symbol: 'circle'
                    }
                },
                series: {
                    cursor: 'pointer'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br>',
                valueDecimals: 2

            },
            series: []
        };

        $scope.initChart = function () {
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });

        };

        $scope.setChartData = function (seriesOptions) {

            if (!chart) {
                chartOptions.series = seriesOptions;
                chart = new Highcharts.StockChart(chartOptions);
            }

            for (var i = 0; i < seriesOptions.length; i++) {
                var serie = seriesOptions[i];
                chart.series[i].update(serie, false);
            }

            chart.redraw()
        };

        $rootScope.requestAndBuildChart = function () {
            var token = AuthToken.getToken();
            $http.get(CONFIG.user + '/debateHistory?token=' + token)
                .success(function (dataResponse) {
                    $scope.setChartData(dataResponse.result);
                });
        };

        $scope.initChart();
        $rootScope.requestAndBuildChart();
    })

    .controller('SparklineCtrl', function ($scope, $rootScope, $http, AuthToken) {
        $scope.initSparkChart = function () {
            Highcharts.SparkLine = function (options, callback) {
                var defaultOptions = {
                    chart: {
                        renderTo: 'userResults',
                        backgroundColor: null,
                        borderWidth: 0,
                        margin: [2, 0, 2, 0],
                        width: 200,
                        height: 60,
                        style: {
                            overflow: 'visible'
                        },
                        skipClone: true
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        startOnTick: false,
                        endOnTick: false,
                        tickPositions: []
                    },
                    yAxis: {
                        endOnTick: false,
                        startOnTick: false,
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        tickPositions: [0],
                        min: 65
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        backgroundColor: null,
                        borderWidth: 0,
                        shadow: false,
                        useHTML: true,
                        hideDelay: 0,
                        shared: true,
                        padding: 0,
                        positioner: function (w, h, point) {
                            return {x: point.plotX - w / 2, y: point.plotY - h};
                        }
                    },
                    plotOptions: {
                        series: {
                            animation: false,
                            lineWidth: 2,
                            shadow: false,
                            states: {
                                hover: {
                                    lineWidth: 3
                                }
                            },
                            marker: {
                                radius: 3,
                                states: {
                                    hover: {
                                        radius: 4
                                    }
                                }
                            },
                            fillOpacity: 0.25
                        }
                    }
                };
                options = Highcharts.merge(defaultOptions, options);

                return new Highcharts.Chart(options, callback);
            };

            var start = +new Date(),
                $tds = $("td[data-sparkline]"),
                fullLen = $tds.length,
                n = 0;

            function doChunk() {
                var time = +new Date(),
                    i,
                    len = $tds.length,
                    $td,
                    stringdata,
                    arr,
                    data,
                    chart;

                for (i = 0; i < len; i += 1) {
                    $td = $($tds[i]);
                    stringdata = $td.data('sparkline');
                    arr = stringdata.split('; ');
                    data = $.map(arr[0].split(', '), parseFloat);
                    chart = {};

                    if (arr[1]) {
                        chart.type = arr[1];
                    }
                    $td.highcharts('SparkLine', {
                        series: [{
                            data: data,
                            pointStart: 1
                        }],
                        tooltip: {
                            headerFormat: '<span style="font-size: 10px">' + $td.parent().find('th').html() + ', R{point.x}:</span><br/>',
                            pointFormat: '<b>{point.y}</b> PTS'
                        },
                        exporting: {
                            enabled: false
                        },
                        chart: chart
                    });

                    n += 1;

                    if (new Date() - time > 500) {
                        $tds.splice(0, i + 1);
                        setTimeout(doChunk, 0);
                        break;
                    }

                }
            }

            doChunk();
        };

        $scope.formatDate = function(timestamp){
            return moment(timestamp).format('LL')
        };

        $scope.requestAndBuildSparkChart = function () {
            var token = AuthToken.getToken();
            $http.get(CONFIG.user + '/detailedDebateHistory?token=' + token)
                .success(function (dataResponse) {
                    $scope.sparkChartData = dataResponse.result;
                    setTimeout($scope.initSparkChart, 0);
                });
        };

        $scope.requestAndBuildSparkChart();
    });