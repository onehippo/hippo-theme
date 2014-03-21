(function() {
    "use strict";

    angular.module('hippo.theme')

    /**
     * @ngdoc directive
     * @name hippo.theme.directive:selectBox
     * @restrict A
     *
     * @description
     * Converts a plain HTML select input field to a jQuery Chosen select box
     */
    .directive('hippo.theme.selectBox', [
        function() {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    scope.$watch('options', function() {
                        element.trigger('chosen:updated');
                    });

                    element.chosen({
                        width: "100%"
                    });
                }
            };
        }
    ]);
}());