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

    angular.module('hippo.theme.example').controller('CarouselCtrl', [
        '$scope',
        function ($scope) {
            $scope.myInterval = 5000;
            var slides = $scope.slides = [];
            slides.push({
                image: 'http://www.tehcute.com/pics/201109/Baby-hippo-is-cute.jpg',
                text: 'Cute hippo'
            });

            slides.push({
                image: 'http://www.kaushik.net/avinash/wp-content/uploads/2010/03/cute_hippo.png',
                text: 'Hippo toy'
            });

            slides.push({
                image: 'http://28.media.tumblr.com/tumblr_kwkqsjzp6k1qzi15io1_500.jpg',
                text: 'More Hippos'
            });
        }
    ]);
}());
