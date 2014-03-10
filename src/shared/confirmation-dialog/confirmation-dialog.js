(function () {
    "use strict";

    angular.module('hippo.theme')

        /**
         * @ngdoc directive
         * @name hippo.theme.directive:confirmationDialog
         * @restrict A
         *
         * @description
         * Renders a confirmation dialog that displays a message and provides a confirm- and cancel button.
         */
        .directive('hippo.theme.confirmationDialog', [function () {
            return {
                restrict: 'A',
                transclude: true,
                template: '' +
                    '<div class="feedback alert alert-warning clearfix" data-ng-class="{\'feedback-show\': show}">' +
                        '<div ng-transclude></div>' +
                        '<p class="text-right buttons">' +
                            '<button class="btn btn-default" data-ng-click="performConfirmation()">' +
                                '<i class="fa fa-trash-o"></i> {{ confirmLabel }}' +
                            '</button>' +
                            '&nbsp;&nbsp;' +
                            '<button class="btn btn-link" data-ng-click="performCancel()">' +
                                '{{ cancelLabel }}' +
                            '</button>' +
                        '</p>' +
                    '</div>',
                scope: {
                    confirmLabel: '@',
                    cancelLabel: '@',
                    show: '=',
                    performConfirmation: '&',
                    performCancel: '&'
                },
                link: function (scope, elem, attrs) {
                    scope.confirm = scope.performConfirmation;
                    scope.cancel = scope.performCancel;
                }
            };
        }]);
})();