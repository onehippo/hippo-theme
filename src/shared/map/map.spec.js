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
describe('Hippo Theme map', function () {

    beforeEach(function () {
        // modules
        module('hippo.theme');
    });

    describe('the directive map', function () {
        var elm, scope, done = false;

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope;
            scope.points = [
                {
                    longitude: 4.901623,
                    latitude: 52.359383
                },
                {
                    longitude: 4.901624,
                    latitude: 52.359384
                }
            ];

            elm = angular.element('<div hippo.theme.map markers="points"></div>');
            $compile(elm)(scope);
            scope.$digest();

            var counter = 0;
            var timer = setInterval(function () {
                if (elm.find('.gm-style').length > 0 || counter > 100) {
                    done = true;
                    clearInterval(timer);

                    // TODO: in order to move the 'it' block under beforeEach, we
                    // should support asynchronous events with Jasmine 2.0
                    it('should exist', function () {
                        expect(elm.find('div').filter(function () {
                            var element = angular.element(this);
                            if (element.find('div').length > 0) {
                                return false;
                            }

                            var text = element.text();
                            try {
                                var value = parseInt(text);
                                if (value == 2) {
                                    return true;
                                }
                            } catch (e) {
                                // not an integer
                            }
                            return false;
                        }).length).toBe(1);
                    });
                }
                counter++;
            }, 1500);
        }));
    });
});
