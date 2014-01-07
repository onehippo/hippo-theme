describe('In the Visitor Analysis module', function () {

    beforeEach(function () {
        // modules
        module('hippo.theme');
        module('hippo.app.pages.visitor-analysis');

        // load templates
        module('app/modules/pages/visitor-analysis/visitor-analysis-overview.html');
    });

    describe('the directive map', function () {
        var elm, scope;

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope;
            scope.points = [];

            elm = angular.element('<map markers="points"></map>');
            $compile(elm)(scope);
            scope.$digest();
        }));

        it('should exist', function () {
            expect(elm).toBe('map');
        });
    });
});