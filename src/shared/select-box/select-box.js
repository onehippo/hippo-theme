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
                scope: {
                    placeholder: '@',
                    noResultsText: '@'
                },
                link: function(scope, element) {
                    scope.$watch('options', function() {
                        element.trigger('chosen:updated');
                        element.trigger('chosen:updated.chosen');
                    });

                    element.chosen({
                        width: "100%",
                        no_results_text: scope.noResultsText,
                        single_text: scope.placeholder,
                        multiple_text: scope.placeholder
                    });
                }
            };
        }
    ]);
}());