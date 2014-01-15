(function() {
    "use strict";

    angular.module('hippo.theme')

    /**
     * @ngdoc directive
     * @name hippo.theme.directive:chart
     * @restrict A
     *
     * @description
     * Visualize a list of data with a pie-chart.
     *
     * @scope
     * @param {Array} data A list of data to be visualised, each object of the list having a 'label' and 'value' property.
     */
    .directive('chart', [

        function() {
            return {
                restrict: 'A',
                scope: {
                    data: '='
                },
                link: function(scope, elem, attrs) {
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

                    scope.$watch('data', function(v) {
                        // re-map data, ready to be parsed by the flot library
                        if (v) {
                            var data = _.map(v, function(item) {
                                return {
                                    label: item.label,
                                    data: item.value
                                };
                            });

                            if (!chart) {
                                chart = $.plot(elem, data, opts);
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
        }
    ]);
})();