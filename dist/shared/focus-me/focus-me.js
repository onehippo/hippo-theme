(function() {
    "use strict";

    angular.module('hippo.theme')

        /**
         * @ngdoc directive
         * @name hippo.theme.directive:focusMe
         * @restrict A
         *
         * @description
         * Sets the focus on this element.
         * Credits to Mark Rajcok: http://stackoverflow.com/a/14837021/363448
         */
        .directive('focusMe', function($timeout, $parse) {
            return {
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.focusMe);

                    scope.$watch(model, function(value) {
                        if(value === true) {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        });
})();
