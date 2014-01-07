(function() {
    "use strict";

    angular.module('hippo.theme')
    /**
     * @ngdoc directive
     * @name hippo.app.directive:divider
     * @restrict A
     *
     * @description
     * When passed true as value, it adds a DOM node as divider to the element.
     */
    .directive('divider', [function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
               var active = scope.$eval(attrs.divider);
                if (active) {
                    elem.before('<li role="presentation" class="divider"></li>');
                }
            }
        };
    }]);
})();
