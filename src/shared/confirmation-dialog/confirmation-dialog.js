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
         * It has two states, s-visible and s-invisible, which are represented by CSS-classes.
         * The CSS property `top` will animate when the value is changed in CSS.
         */
        .directive('hippo.theme.confirmationDialog', [function () {
            return {
                restrict: 'A',
                transclude: true,
                template: '' +
                    '<div class="alert alert-warning confirmation-dialog" data-ng-class="{\'s-visible\': show, \'s-invisible\': !show}">' +
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