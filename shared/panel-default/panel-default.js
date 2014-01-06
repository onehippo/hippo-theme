(function () {
    "use strict";

    angular.module('hippo.app')

        /**
         * @ngdoc directive
         * @name hippo.app.directive:panelDefault
         * @restrict A
         *
         * @description
         * Component for the Bootstrap default panel.
         */
        .directive('panelDefault', [function () {
            return {
                restrict: 'A',
                replace: true,
                transclude: true,
                templateUrl: 'app/modules/shared/panel-default/panel-default.html',
                scope: {
                    title: '='
                },
                link: function (scope) {
                    scope.panel = {
                        title: scope.title
                    };
                }
            };
        }]);
}());