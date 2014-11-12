/*
 * Copyright 2014 Hippo B.V. (http://www.onehippo.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
    .directive('hippo.theme.chart', [

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
                            var data = v.map(function(item) {
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
