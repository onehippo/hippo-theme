(function() {
    "use strict";

    angular.module('hippo.theme')

    /**
     * @ngdoc directive
     * @name hippo.app.directive:chart
     * @restrict A
     *
     * @description
     * Visualize a list of data with a pie-chart.
     *
     * @scope
     * @param {Array} data A list of data to be visualised, each element having a 'label' and 'value' property.
     */
    .directive('chart', [function () {
        // TODO: move this to a more general module
        return {
            restrict: 'A',
            scope: {
                data: '='
            },
            link: function (scope, elem, attrs) {
                // TODO: this is too tightly coupled with the API, eg. it uses 'termFreq'
                var chart = null;
                var opts = {
                    series: {
                        pie: {
                            show: true,
                            highlight: {
                                opacity: 0.25
                            },
                            stroke: {
                                color: '#fff',
                                width: 2
                            },
                            startAngle: 2
                        }
                    },
                    legend: {
                        show: true,
                        position: "ne",
                        labelBoxBorderColor: null
                    },
                    grid: {
                        hoverable: true,
                        clickable: true
                    }
                };

                scope.$watch('data', function (v) {
                    // re-map data, ready to be parsed by the flot library
                    if (v) {
                        var data = _.map(_.keys(v.termFreq), function (key) {
                            return { label: key, data: v.termFreq[key] };
                        });

                        if (!chart) {
                            chart = $.plot(elem, data , opts);
                            elem.show();
                        } else {
                            chart.setData(data);
                            chart.setupGrid();
                            chart.draw();
                        }
                    }
                });
            }
        };
    }]);
})();
