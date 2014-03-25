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
(function () {
    "use strict";

    angular.module('hippo.theme')

    /**
     * @ngdoc service
     * @name hippo.theme.service:ViewportSizes
     *
     * @description
     * Holds the different possible viewport sizes.
     * It is able to return the current viewport size and provides a method to set the current viewport size.
     */
            .service('hippo.theme.ViewportSizes', [function () {
                    var viewportSizes = {};

                    var sizes = [
                        {
                            order: 0,
                            name: 'xs',
                            active: false
                        },

                        {
                            order: 1,
                            name: 'sm',
                            active: false
                        },

                        {
                            order: 2,
                            name: 'md',
                            active: false
                        },

                        {
                            order: 3,
                            name: 'lg',
                            active: false
                        }
                    ];

                    /**
                     * @ngdoc method
                     * @name hippo.theme#getAll
                     * @methodOf hippo.theme.service:ViewportSizes
                     *
                     * @description
                     * Returns all the possible viewport sizes
                     *
                     * @returns {Array} List of viewport sizes
                     */
                    viewportSizes.getAll = function () {
                        return sizes;
                    };

                    /**
                     * @ngdoc method
                     * @name hippo.app#setCurrent
                     * @methodOf hippo.theme.service:ViewportSizes
                     * @param {Object} viewport The viewport to set as active
                     *
                     * @description
                     * Sets the current active viewport. It also updates the $rootScope `activeViewport` property with the active viewport;
                     */
                    viewportSizes.setCurrent = function (viewport) {
                        _.each(sizes, function (size) {
                            size.active = (viewport.name == size.name);
                        });
                    };

                    /**
                     * @ngdoc method
                     * @name hippo.theme#getCurrent
                     * @methodOf hippo.theme.service:ViewportSizes
                     *
                     * @description
                     * Fetches the current active viewport
                     *
                     * @returns {Object} The current active viewport
                     */
                    viewportSizes.getCurrent = function () {
                        return _.find(sizes, function (size) {
                            return size.active === true;
                        });
                    };

                    return viewportSizes;
                }
            ])

    /**
     * @ngdoc directive
     * @name hippo.theme.directive:viewportTest
     * @restrict A
     * @requires $window
     *
     * @description
     * Detects the current active viewport by creating an empty div-element and attaching Bootstrap 3 classes to it.
     * When the created element is hidden, the related viewport for the class given is set to active.
     *
     * When the window gets resized, the possible new viewport will automatically be detected and set as active.
     */
            .directive('hippo.theme.viewportTest', ['$window', 'hippo.theme.ViewportSizes',
                function ($window, ViewportSizes) {
                    return {
                        restrict: 'A',
                        replace: true,
                        template: '<div></div>',
                        link: function (scope, elem) {
                            // initial detection
                            detectViewportSize();

                            // window resize
                            angular.element($window).bind('resize', function () {
                                detectViewportSize();
                            });

                            // detect viewport size
                            function detectViewportSize() {
                                // optimized version of http://stackoverflow.com/a/15150381/363448
                                var emptyDiv = angular.element('<div>');
                                elem.append(emptyDiv);

                                var sizes = ViewportSizes.getAll();

                                for (var i = sizes.length - 1; i >= 0; i--) {
                                    var size = sizes[i];

                                    emptyDiv.addClass('hidden-' + size.name);
                                    if (emptyDiv.is(':hidden')) {
                                        emptyDiv.remove();
                                        ViewportSizes.setCurrent(size);
                                        return;
                                    }
                                }
                            }
                        }
                    };
                }
            ]);
}());
