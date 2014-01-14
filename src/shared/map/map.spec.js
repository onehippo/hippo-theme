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

      elm = angular.element('<map markers="points"></map>');
      $compile(elm)(scope);
      scope.$digest();
    }));

    it('should exist', function() {
      expect(elm).toBe('map');
    });
  });
});