(function () {
  angular.module('hippo.theme.example', ['hippo.theme'])
    
    /**
     * @ngdoc object
     * @name hippo.theme.example:SelectBoxCtrl
     *
     * @description
     * Controller for the Select Box example.
     */
    .controller('SelectBoxCtrl', ['$scope', function ($scope) {
      console.log('Select box ctrl init!');
      
      $scope.selectedValues = [];
      $scope.options = [
        { "id": 1, "name": 'Option 1' },
        { "id": 2, "name": 'Option 2' },
        { "id": 3, "name": 'Option 3' },
        { "id": 4, "name": 'Option 4' },
        { "id": 5, "name": 'Option 5' }
      ];
      $scope.placeholder = "Choose an option";
    }]);
})();