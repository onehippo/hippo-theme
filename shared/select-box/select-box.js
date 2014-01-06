(function () {
    "use strict";

    angular.module('hippo.app')

        /**
         * @ngdoc directive
         * @name hippo.app.directive:selectBox
         * @restrict A
         *
         * @description
         * Converts a plain HTML select input field to a jQuery Chosen select box
         */
        .directive('selectBox', [function () {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    scope.$watch('options', function () {
                        element.trigger('chosen:updated');
                    });

                    element.chosen({width: "100%"});
                }
            };
        }]);
}());