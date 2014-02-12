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
            $scope.selectedValues = [];
            $scope.options = [
                { "id": 1, "name": 'Option 1' },
                { "id": 2, "name": 'Option 2' },
                { "id": 3, "name": 'Option 3' },
                { "id": 4, "name": 'Option 4' },
                { "id": 5, "name": 'Option 5' }
            ];
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
        .controller('TreeCtrl', ['$scope', function ($scope) {
            $scope.treeItems = [
                {
                    id: 'item-a',
                    text: 'Item A',
                    children: [{
                        id: 'item-a1',
                        text: 'Item A.1'
                    }, {
                        id: 'item-a2',
                        text: 'Item A.2',
                        children: [{
                            id: 'item-2-1',
                            text: 'Item A.2.1'
                        }, {
                            id: 'item-2-2',
                            text: 'Item A.2.2'
                        }, {
                            id: 'item-2-3',
                            text: 'Item A.2.3'
                        }]
                    }, {
                        id: 'item-a3',
                        text: 'Item A.3'
                    }]
                }, {
                    id: 'item-b',
                    text: 'Item B'
                }, {
                    id: 'item-c',
                    text: 'Item C'
                }
            ];

            $scope.setSelected = function (itemId) {
                console.log('New selected item id: ', itemId);
            };

            $scope.nodeMoved = function (node) {
                console.log('Tree node moved: ', node);
            };
        }]);

})();