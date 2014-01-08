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
                template:  '<div class="panel panel-default">' +
                                '<div class="panel-heading">{{ panel.title | translate }}</div>' +
                                '<div class="panel-body">' +
                                    '<div><div ng-transclude></div></div>' +
                                '</div>' +
                            '</div>',
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