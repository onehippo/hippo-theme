(function () {
    "use strict";

    angular.module('hippo.theme')

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
                templateUrl: 'components/angular-plugins/dist/shared/panel-default/panel-default.html',
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
