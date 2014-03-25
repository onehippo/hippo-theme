/*
 * Copyright 2014 Hippo B.V. (http://www.onehippo.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
