describe('Hippo Theme map', function() {

    beforeEach(function() {
        // load modules
        module('hippo.theme');
    });

    describe('the URLParser service', function() {
        var urlparserService = null;

        beforeEach(inject(function(URLParser) {
            urlparserService = URLParser;
        }));

        it('should be defined', function() {
            expect(urlparserService).not.toBe(null);
        });

        it('should have a method getAll', function() {
            spyOn(urlparserService, 'getAll');
            urlparserService.getAll();
            expect(urlparserService.getAll).toHaveBeenCalled();
        });

        it('should have a method getFirst', function() {
            spyOn(urlparserService, 'getFirst');
            urlparserService.getFirst();
            expect(urlparserService.getFirst).toHaveBeenCalled();
        });
    });
});