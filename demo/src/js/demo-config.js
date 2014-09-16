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

  angular.module('hippo.theme.example').config(
    ['$routeProvider',
      function ($routeProvider) {
        $routeProvider
          .when('/introduction', {
            templateUrl: 'introduction.html'
          })
          .when('/css-core', {
            templateUrl: 'css-core.html'
          })
          .when('/grid-systems', {
            templateUrl: 'grid-systems.html'
          })
          .when('/bootstrap-components', {
            templateUrl: 'bootstrap-components.html'
          })
          .when('/angular-components', {
            templateUrl: 'angular-components.html'
          })
          .otherwise('/introduction');
      }
    ]
  );
}());
