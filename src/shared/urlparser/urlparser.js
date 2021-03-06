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
   * @ngdoc service
   * @name hippo.theme.service:URLParser
   *
   * @description
   * Whenever the current state changes, the URLParser service will parse the new URL and provide an array containing each part,
   *
   * The URL is divided by forward slashes, so /page/subpage/detail will result in an array containing 'page', 'subpage' and 'detail'.
   
   * Modified version of the [Angular App breadcrumb service](https://github.com/angular-app/angular-app/blob/master/client/src/common/services/breadcrumbs.js)
   */
    .service('hippo.theme.URLParser', ['$rootScope', '$location',
        function($rootScope, $location) {
            var urlParts = [];
            var urlParserService = {};

            //we want to update the parts only when a route is actually changed
            //as $location.path() will get updated immediately (even if route change fails!)
            $rootScope.$on('$stateChangeSuccess', function(event, current) {
                var pathElements = $location.path().split('/'),
                    result = [],
                    i;
                var partPath = function(index) {
                    return '/' + (pathElements.slice(0, index + 1)).join('/');
                };

                pathElements.shift();
                for (i = 0; i < pathElements.length; i++) {
                    result.push({
                        name: pathElements[i],
                        path: partPath(i)
                    });
                }

                urlParts = result;
            });

            /**
             * @ngdoc method
             * @name hippo.theme#getAll
             * @methodOf hippo.theme.service:URLParser
             *
             * @description
             * Get all the URL parts
             *
             * @returns {Array} List of URL parts
             */
            urlParserService.getAll = function() {
                return urlParts;
            };

            /**
             * @ngdoc method
             * @name hippo.theme#getFirst
             * @methodOf hippo.theme.service:URLParser
             *
             * @description
             * Get the first part of the URL
             *
             * @returns {String} The first part of the URL
             */
            urlParserService.getFirst = function() {
                return urlParts[0] || {};
            };

            /**
             * @ngdoc method
             * @name hippo.theme#getAllWithoutLast
             * @methodOf hippo.theme.service:URLParser
             *
             * @description
             * Get all the URL parts without the last part. This can be useful when the last part is an id that you don't want to use.
             *
             * @returns {Array} List of URL parts, without the last part
             */
            urlParserService.getAllWithoutLast = function() {
                var tmp = urlParts.slice(0);
                tmp.pop();
                return tmp;
            };

            /**
             * @ngdoc method
             * @name hippo.theme#getParent
             * @methodOf hippo.theme.service:URLParser
             *
             * @description
             * Get the parent / previous state of the current view
             *
             * @returns {String} The state name for the parent / previous view
             */
            urlParserService.getParent = function() {
                return urlParts[urlParts.length - 2] || null;
            };

            return urlParserService;
        }
    ]);
}());
