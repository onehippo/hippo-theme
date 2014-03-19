(function () {
    "use strict";

    angular.module('hippo.theme')

        /**
         * @ngdoc directive
         * @name hippo.theme.directive:confirmationDialog
         * @restrict A
         * @scope
         *
         * @param {string} confirmIcon The name of a FontAwesome icon to show, without the fa-* prefix
         * @param {string} confirmLabel The label to show for the confirmation button
         * @param {string} cancelLabel The label to show for the cancel link
         * @param {expression} performConfirmation Function to call when the confirm button is clicked.
         * @param {expression} performCancel Function to call when the cancel button is clicked.
         * @param {boolean} show Will set the .s-invisible or .s-visible class on the element.
         *
         * @description
         * Renders a confirmation dialog that can show any message and provides a confirm- and cancel button.
         * It has two states, `s-visible` and `s-invisible`, which are represented by CSS-classes.
         * The CSS property `top` will animate when the value is changed in CSS.
         *
         * *Note*: the confirmation dialog won't show or hide itself. You can do this easily by assigning the desired
         * CSS properties for the `.s-visible` and `.s-invisible` classes in your own CSS.
         */
        .directive('hippo.theme.confirmationDialog', [function () {
            return {
                restrict: 'A',
                replace: true,
                transclude: true,
                template: '' +
                    '<div class="alert alert-warning confirmation-dialog" data-ng-class="{\'s-visible\': show, \'s-invisible\': !show}">' +
                        '<div ng-transclude></div>' +
                        '<p class="text-right buttons">' +
                            '<button class="btn btn-default" data-ng-click="performConfirmation()">' +
                                '<i class="fa fa-{{ confirmIcon }}" data-ng-show="confirmIcon"></i> {{ confirmLabel }}' +
                            '</button>' +
                            '&nbsp;&nbsp;' +
                            '<button class="btn btn-default" data-ng-click="performCancel()">' +
                                '{{ cancelLabel }}' +
                            '</button>' +
                        '</p>' +
                    '</div>',
                scope: {
                    confirmIcon: '@',
                    confirmLabel: '@',
                    cancelLabel: '@',
                    performConfirmation: '&',
                    performCancel: '&',
                    show: '='
                },
                link: function (scope, elem, attrs) {

                }
            };
        }]);
})();