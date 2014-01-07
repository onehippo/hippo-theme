describe('Hippo Theme map', function () {

    beforeEach(function () {
        // load modules
        module('hippo.theme');
    });

    describe('the ViewportSizes service', function () {
        var viewportSizesService = null;

        beforeEach(inject(function (ViewportSizes) {
            viewportSizesService = ViewportSizes;
        }));

        it('should be defined', function () {
            expect(viewportSizesService).not.toBe(null);
        });

        it('should have a method getAll', function () {
            spyOn(viewportSizesService, 'getAll');
            viewportSizesService.getAll();
            expect(viewportSizesService.getAll).toHaveBeenCalled();
        });

        it('should have a method setCurrent', function () {
            spyOn(viewportSizesService, 'setCurrent');
            viewportSizesService.setCurrent();
            expect(viewportSizesService.setCurrent).toHaveBeenCalled();
        });

        it('should have a method getCurrent', function () {
            spyOn(viewportSizesService, 'getCurrent');
            viewportSizesService.getCurrent();
            expect(viewportSizesService.getCurrent).toHaveBeenCalled();
        });
    });

    describe('the directive viewportTest', function () {
        var elm, scope;

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope;
            elm = angular.element('<viewport-test>');
            $compile(elm)(scope);
            scope.$digest();
        }));

        it('should exist', function () {
            expect(elm).toExist();
        });
    });
});
