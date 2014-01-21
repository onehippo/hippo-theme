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
                }
                counter++;
            }, 1500);

            waitsFor(function () {
                return done;
            });
        }));

        it('should exist', function () {
            console.log(elm);
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
    });
});