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
(function () {
    "use strict";

    angular.module('hippo.theme.example', ['hippo.theme'])
        .controller('ErrorCtrl', ['$scope', '$document', function ($scope, $document) {
            $scope.showErrors = false;
            $scope.toggleErrors = function ($event) {
                $event.stopPropagation();
                $scope.showErrors = !$scope.showErrors;
            };

            $document.bind('click', function () {
                $scope.showErrors = false;
                $scope.$apply();
            });
        }])

        .controller('LogCtrl', ['$scope', function ($scope) {
            $scope.showLog = true;
            $scope.hideLog = function () {
                $scope.showLog = false;
            };

            $scope.displayLog = function (event) {
                event.preventDefault();
                $scope.showLog = true;
            };
        }])

        .controller('NavCtrl', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
            $scope.scrollTo = function (id) {
                $location.hash(id);
                $anchorScroll();
            };
        }])

        /**
         * @ngdoc object
         * @name hippo.theme.example:SelectBoxCtrl
         *
         * @description
         * Controller for the Select Box example.
         */
        .controller('SelectBoxCtrl', ['$scope', function ($scope) {
            $scope.values = [
                { "id": 1, "name": 'Option 1' },
                { "id": 2, "name": 'Option 2' },
                { "id": 3, "name": 'Option 3' },
                { "id": 4, "name": 'Option 4' },
                { "id": 5, "name": 'Option 5' }
            ];

            $scope.singleSelectedValue = $scope.values[0];

            $scope.selectedValues = [];

            $scope.placeholder = 'Choose an option';
            $scope.noResultsText = 'No results for';
        }])

        /**
         * @ngdoc object
         * @name hippo.theme.example:ChartCtrl
         *
         * @description
         * Controller for the Chart example.
         */
        .controller('ChartCtrl', ['$scope', function ($scope) {
            $scope.data = [
                {
                    label: 'Hippo A',
                    value: 5
                }, {
                    label: 'Hippo B',
                    value: 10
                }, {
                    label: 'Hippo C',
                    value: 25
                }
            ];
        }])

        /**
         * @ngdoc object
         * @name hippo.theme.example:DividerCtrl
         *
         * @description
         * Controller for the Divider example.
         */
        .controller('DividerCtrl', ['$scope', function ($scope) {
            $scope.items = [
                'Item A',
                'Item B',
                'Item C'
            ];
        }])

        /**
         * @ngdoc object
         * @name hippo.theme.example:FocusMeCtrl
         *
         * @description
         * Controller for the Focus me example.
         */
        .controller('FocusMeCtrl', ['$scope', function ($scope) {
            $scope.field = {
                focus: false
            };

            $scope.setFocus = function () {
                $scope.field.focus = true;
            };
        }])

        /**
         * @ngdoc object
         * @name hippo.theme.example:MapCtrl
         *
         * @description
         * Controller for the Map example.
         */
        .controller('MapCtrl', ['$scope', function ($scope) {
            $scope.points = [{
                longitude: 4.901623,
                latitude: 52.359383
            }, {
                longitude: 4.901624,
                latitude: 52.359384
            }, {
                longitude: -71.081628,
                latitude: 42.362243
            }];
        }])

        /**
         * @ngdoc object
         * @name hippo.theme.example:PanelCtrl
         *
         * @description
         * Controller for the Panel example.
         */
        .controller('PanelCtrl', ['$scope', function ($scope) {
            $scope.title = 'Panel title';
        }])

        /**
         * @ngdoc object
         * @name hippo.theme.example:TreeCtrl
         *
         * @description
         * Controller for the Tree example.
         */
        .controller('TreeCtrl', ['$scope', '$log', function ($scope, $log) {
            $scope.treeItems = [
                {
                    id: 'item-a',
                    title: 'Item A',
                    items: [
                        {
                            id: 'item-a1',
                            title: 'Item A.1',
                            items: []
                        },
                        {
                            id: 'item-a2',
                            title: 'Item A.2 has a very long name that probably will not fit on a single row when tree becomes very small',
                            items: [
                                {
                                    id: 'item-2-1',
                                    title: 'Item A.2.1',
                                    items: []
                                },
                                {
                                    id: 'item-2-2',
                                    title: 'Item A.2.2',
                                    items: []
                                },
                                {
                                    id: 'item-2-3',
                                    title: 'Item A.2.3',
                                    items: []
                                }
                            ]
                        },
                        {
                            id: 'item-a3',
                            title: 'Item A.3',
                            items: []
                        }
                    ]
                },
                {
                    id: 'item-b',
                    title: 'Item B',
                    items: []
                },
                {
                    id: 'item-c',
                    title: 'Item C',
                    collapsed: true,
                    items: [
                        {
                            id: 'item-c1',
                            title: 'Item C.1',
                            items: []
                        }
                    ]
                }
            ];

            $scope.selectedItem = $scope.treeItems[0].items[0];

            $scope.callbacks = {
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    return destNodesScope && !destNodesScope.nodrop;
                },

                dragStart: function(event) {
                    var sourceItem = event.source.nodeScope.$modelValue;
                    $log.info('start dragging ' + sourceItem.title);
                    $scope.selectedItem = sourceItem;
                },

                dragStop: function(event) {
                    var sourceItem = event.source.nodeScope.$modelValue;
                    $log.info('stop dragging ' + sourceItem.title);
                },

                dropped: function(event) {
                    var source = event.source,
                            dest = event.dest;
                    if (source.nodeScope && dest.nodesScope) {
                        var sourceItem = source.nodeScope.$modelValue;
                        var destItem = dest.nodesScope.$nodeScope ? dest.nodesScope.$nodeScope.$modelValue : {title: 'root'};
                        var destIndex = dest.index;
                        $log.info('dropped ' + sourceItem.title + ' into ' + destItem.title + ' at index ' + destIndex);
                    }
                }
            };
        }])

        /**
         * @ngdoc object
         * @name hippo.theme.example:ConfirmationDialogCtrl
         *
         * @description
         * Controller for the Comfirmation Dialog example.
         */
        .controller('ConfirmationDialogCtrl', ['$scope', '$log', function ($scope, $log) {
            $scope.confirmation = {
                show: true
            };

            $scope.confirmationClicked = function () {
                $log.info('Confirmation button clicked');
                $scope.confirmation.show = true;
            };

            $scope.cancelClicked = function () {
                $log.info('Cancel button clicked');
                $scope.confirmation.show = false;
            };
        }])

        .controller('FeatureCtrl', ['$scope', function ($scope) {
            $scope.showDescription = false;
            $scope.showChanges = false;

            $scope.toggleDescription = function () {
                $scope.showDescription = !$scope.showDescription;
            };

            $scope.toggleChanges = function () {
                $scope.showChanges = !$scope.showChanges;
            };
        }]);
})();
