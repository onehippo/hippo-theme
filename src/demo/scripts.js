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
            console.log('Select box ctrl init!');

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
        }]);

})();