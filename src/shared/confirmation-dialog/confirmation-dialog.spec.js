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
describe('Hippo Theme confirmation dialog', function() {

    beforeEach(function() {
        // load modules
        module('hippo.theme');
    });

    describe('the directive hippo.theme.confirmationDialog', function() {
        var elm, scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope;
            elm = angular.element('<div hippo.theme.confirmation-dialog></div>');
            $compile(elm)(scope);
            scope.$digest();
        }));

        it('should exist', function() {
            expect(elm).toHaveClass('confirmation-dialog');
        });
    });
});
