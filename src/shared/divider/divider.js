(function() {
    "use strict";

    angular.module('hippo.theme')

    /**
     * @ngdoc directive
     * @name hippo.theme.directive:divider
     * @restrict A
     *
     * @description
     * When passed true as value, it adds a DOM node as divider to the element.
     */
    .directive('hippo.theme.divider', [

        function() {
            return {
                restrict: 'A',
                link: function(scope, elem, attrs) {
                    var active = scope.$eval(attrs['hippo.theme.divider']);
                    if (active) {
                        elem.before('<li role="presentation" class="divider"></li>');
                    }
                }
            };
        }
    ]);
})();