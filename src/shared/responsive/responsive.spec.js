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
describe('Hippo Theme map', function() {

    beforeEach(function() {
        // load modules
        module('hippo.theme');
    });

    describe('the ViewportSizes service', function() {
        var viewportSizesService = null;

        beforeEach(inject(['hippo.theme.ViewportSizes', function(ViewportSizes) {
            viewportSizesService = ViewportSizes;
        }]));

        it('should be defined', function() {
            expect(viewportSizesService).not.toBe(null);
        });

        it('should have a method getAll', function() {
            spyOn(viewportSizesService, 'getAll');
            viewportSizesService.getAll();
            expect(viewportSizesService.getAll).toHaveBeenCalled();
        });

        it('should have a method setCurrent', function() {
            spyOn(viewportSizesService, 'setCurrent');
            viewportSizesService.setCurrent();
            expect(viewportSizesService.setCurrent).toHaveBeenCalled();
        });

        it('should have a method getCurrent', function() {
            spyOn(viewportSizesService, 'getCurrent');
            viewportSizesService.getCurrent();
            expect(viewportSizesService.getCurrent).toHaveBeenCalled();
        });
    });

    describe('the directive viewportTest', function() {
        var elm, scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope;
            elm = angular.element('<hippo.theme.viewport-test />');
            $compile(elm)(scope);
            scope.$digest();
        }));

        it('should exist', function() {
            expect(elm).toExist();
        });
    });
});
