angular.module('DashboardProfile', ['ui.bootstrap'])

    .controller('DashboardProfileCtrl', function ($scope, $state) {
        if ($state.current.name == "dashboard.profile")
            $state.go("dashboard.profile.user")
    })

    .controller('ChartCtrl', function ($scope, $rootScope, $http) {
        var chart = null;
        var chartOptions = {
            chart: {
                renderTo: 'container',
                margin: 30,
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
                selected: 4,
                buttons: [{
                    type: 'minute',
                    count: 30,
                    text: '30m'
                }, {
                    type: 'minute',
                    count: 60,
                    text: '1H'
                }, {
                    type: 'minute',
                    count: 180,
                    text: '3H'
                }, {
                    type: 'day',
                    count: 1,
                    text: '1D'
                }, {
                    type: 'all',
                    text: 'All'
                }]
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
                    data: [[1172707200000, 68.0], [1204502400000, 69.00], [1235952000000, 72.00], [1267401600000, 68.00], [1298937600000, 70.00], [1330560000000, 71.5], [1362096000000, 73.00]]
                }, {
                    name: 'Racovita Open',
                    data: [[1175707200000, 68.0], [1207502400000, 70.00], [1238552000000, 67.00], [1270801600000, 68.00], [1301937600000, 70.00], [1333560000000, 70.5], [1364096000000, 71.00]]
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
    });