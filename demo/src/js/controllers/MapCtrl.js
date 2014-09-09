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
   * @name hippo.theme.example:MapCtrl
   *
   * @description
   * Controller for the Map example.
   */
  angular.module('hippo.theme.example').controller('MapCtrl',
    ['$scope',
      function ($scope) {
        $scope.points = [
          {
            longitude: 4.901623,
            latitude: 52.359383
          },
          {
            longitude: 4.901624,
            latitude: 52.359384
          },
          {
            longitude: -71.081628,
            latitude: 42.362243
          }
        ];
      }
    ]
  );
}());
