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