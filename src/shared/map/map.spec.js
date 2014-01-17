describe('Hippo Theme map', function() {

    beforeEach(function() {
        // modules
        module('hippo.theme');
    });

    describe('the directive map', function() {
        var elm, scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope;
            scope.points = [];

            elm = angular.element('<hippo.theme.map markers="points"></hippo.theme.map>');
            $compile(elm)(scope);
            scope.$digest();
        }));

        it('should exist', function() {
            expect(angular.element(elm).find('div').length).toBe(1);
        });
    });
});