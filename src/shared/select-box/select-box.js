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
        '$log',
        function($log) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    if (!angular.isDefined(attrs.options)) {
                        $log.warn("No 'data-options' attribute specified for hippo.theme.selectBox. Changes to the ng-options attribute value will not be reflected in the UI.");
                    }

                    scope.$watch(attrs.options, function() {
                        element.trigger('chosen:updated');
                        element.trigger('chosen:updated.chosen');
                    }, true);

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