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
(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name hippo.theme.example:SelectBoxCtrl
   *
   * @description
   * Controller for the Select Box example.
   */
  angular.module('hippo.theme.example').controller('SelectBoxCtrl',
    ['$scope',
      function ($scope) {
        $scope.values = [
          { "id": 1, "name": 'Option 1' },
          { "id": 2, "name": 'Option 2' },
          { "id": 3, "name": 'Option 3' },
          { "id": 4, "name": 'Option 4' },
          { "id": 5, "name": 'Option 5' }
        ];

        $scope.singleSelectedValue = $scope.values[0];

        $scope.selectedValues = [];

        $scope.placeholder = 'Choose an option';
        $scope.noResultsText = 'No results for';
      }
    ]
  );
}());
