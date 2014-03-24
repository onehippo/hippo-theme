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
                link: function(scope, element, attrs) {
                    scope.$watch('options', function() {
                        element.trigger('chosen:updated');
                        element.trigger('chosen:updated.chosen');
                    });

                    element.chosen({
                        width: "100%",
                        no_results_text: attrs.noResultsText,
                        single_text: attrs.placeholder,
                        multiple_text: attrs.placeholder
                    });
                }
            };
        }
    ]);
}());