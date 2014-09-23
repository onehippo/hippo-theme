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
    'use strict';

//    Override ui.bootstrap carousel template
    angular.module('template/carousel/carousel.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put("template/carousel/carousel.html",
            '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">' +
            '    <ol class="carousel-indicators" ng-show="slides.length > 1">' +
            '        <li hippo-carousel-indicator ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)">' +
            '        </li>' +
            '    </ol>' +
            '    <div class="carousel-inner" ng-transclude></div>' +
            '    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>' +
            '    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
            '</div>'
        );
    }]);

    angular.module('hippo.theme').directive('hippoCarouselIndicator', [
            function () {
                return {
                    restrict: 'A',
                    template: '<img data-ng-src="{{imgSrc}}">',
                    link: function (scope, element, attr) {
//                        Get corresponding slide object from the slide scope
                        var slideObj = scope.slide.$element.scope().slides[scope.$index];
                        scope.imgSrc = slideObj.image;
                    }
                }
            }
    ]);
}());
