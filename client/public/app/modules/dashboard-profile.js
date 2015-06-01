angular.module('DashboardProfile', ['ui.bootstrap'])

    .controller('DashboardProfileCtrl', function ($scope, $state, $location) {
        if ($state.current.name == "dashboard.profile")
            $state.go("dashboard.profile.user");
        switch($state.current.name){
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

    .controller('ChartCtrl', function ($scope, $rootScope, $http) {
        var chart = null;
        var chartOptions = {
            chart: {
                renderTo: 'container',
                marginBottom: 70,
                zoomType: 'x'
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
            var reqData = {
                "id": 0,
                "jsonrpc": "2.0",
                "method": "getEvolutionInfo",
                "params": ["TOKEN"]
            };

            //$http.post(CONFIG.user, JSON.stringify(reqData))
            //    .success(function (dataResponse) {
            //        $scope.setChartData(dataResponse.result);
            //    });
            var dataResponse = {
                result: [{
                    name: 'Saint George',
                    data: [[1172707200000, 68.0], [1204502400000, 69.00], [1235952000000, 72.00], [1267401600000, 68.00]]
                }, {
                    name: 'Racovita Open',
                    data: [[1175707200000, 68.0], [1207502400000, 70.00], [1238552000000, 67.00], [1270801600000, 68.00], [1301937600000, 70.00]]
                }, {
                    name: 'PTA',
                    data: [[1167707200000, 70.0]]
                }, {
                    name: 'Central Open',
                    data: [[1196502400000, 67.00], [1228552000000, 68.00], [1259801600000, 69.00], [1291937600000, 71.00], [1322560000000, 69.5], [1354096000000, 72.00]]
                }
                ]
            };

            $scope.setChartData(dataResponse.result);
        };

        $scope.initChart();
        $rootScope.requestAndBuildChart();
    })

    .controller('SparklineCtrl', function ($scope, $rootScope, $http) {
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
        $scope.initSparkChart();
    });