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
