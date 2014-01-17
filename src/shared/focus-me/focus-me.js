(function() {
    "use strict";

    angular.module('hippo.theme')

    /**
     * @ngdoc directive
     * @name hippo.theme.directive:focusMe
     * @restrict A
     *
     * @description
     * Sets the focus on an element.
     * Credits to Mark Rajcok: http://stackoverflow.com/a/14837021/363448
     */
    .directive('hippo.theme.focusMe', ['$timeout', '$parse',
        function($timeout, $parse) {
            return {
                link: function(scope, element, attrs) {
                    scope.focusMe = false;

                    scope.$watch('focusMe', function(value) {
                        if (value === true) {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });

                    element.blur(function () {
                        scope.focusMe = false;
                        scope.$apply();
                    });
                }
            };
        }
    ]);
})();