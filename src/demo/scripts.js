(function () {
    "use strict";

    angular.module('hippo.theme.example', ['hippo.theme'])
    
        /**
         * @ngdoc object
         * @name hippo.theme.example:SelectBoxCtrl
         *
         * @description
         * Controller for the Select Box example.
         */
        .controller('SelectBoxCtrl', ['$scope', function ($scope) {
            $scope.options = [
                { "id": 1, "name": 'Option 1' },
                { "id": 2, "name": 'Option 2' },
                { "id": 3, "name": 'Option 3' },
                { "id": 4, "name": 'Option 4' },
                { "id": 5, "name": 'Option 5' }
            ];

            $scope.singleSelectedValue = $scope.options[0];
            $scope.selectedValues = [];

            $scope.placeholder = "Choose an option";
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
                            title: 'Item A.2',
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
                    items: [
                        {
                            id: 'item-c1',
                            title: 'Item C.1'
                        }
                    ]
                }
            ];

            $scope.selectedItem = $scope.treeItems[0].items[0];

            $scope.callbacks = {
                accept: function(data, sourceItemScope, targetScope) {
                    $log.info("source sub levels: " + sourceItemScope.maxSubLevels());
                    $log.info("target level: " + targetScope.level());
                    $log.info("parent data: ", targetScope.parentItemScope() ? targetScope.parentItemScope().itemData() : "null");
                    return true;
                },

                orderChanged: function(scope, sourceItem, sourceIndex, destIndex) {
                    var info = "Item [" + sourceItem.title + "] changed order from " + sourceIndex + " to " + destIndex;
                    $log.info(info);
                },

                itemRemoved: function(scope, sourceItem, sourceIndex) {
                    var info = "Item [" + sourceItem.title + "] removed";
                    $log.info(info);
                },

                itemAdded: function(scope, sourceItem, destIndex) {
                    var info = "Item [" + sourceItem.title + "] added to " + destIndex;
                    $log.info(info);
                },

                itemMoved: function(sourceScope, sourceItem, sourceIndex, destScope, destIndex) {
                    var parent = destScope.parentItemScope() ? destScope.parentItemScope().itemData() : {};
                    var info = "Item [" + sourceItem.title + "] moved inside " + parent.title + " with index " + destIndex;
                    $log.info(info);
                },

                itemClicked: function (sourceItem) {
                    $scope.$apply(function () {
                        $scope.selectedItem = sourceItem;
                    });
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
        }]);

})();