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
   * @name hippo.theme.example:TreeCtrl
   *
   * @description
   * Controller for the Tree example.
   */
  angular.module('hippo.theme.example').controller('TreeCtrl',
    ['$scope',
      '$log',
      function ($scope, $log) {
        $scope.treeItems = [
          {
            id: 'item-a',
            title: 'Item A',
            items: [
              {
                id: 'item-a1',
                title: 'Item A.1',
                items: []
              },
              {
                id: 'item-a2',
                title: 'Item A.2 has a very long name that probably will not fit on a single row when tree becomes very small',
                items: [
                  {
                    id: 'item-2-1',
                    title: 'Item A.2.1',
                    items: []
                  },
                  {
                    id: 'item-2-2',
                    title: 'Item A.2.2',
                    items: []
                  },
                  {
                    id: 'item-2-3',
                    title: 'Item A.2.3',
                    items: []
                  }
                ]
              },
              {
                id: 'item-a3',
                title: 'Item A.3',
                items: []
              }
            ]
          },
          {
            id: 'item-b',
            title: 'Item B',
            items: []
          },
          {
            id: 'item-c',
            title: 'Item C',
            collapsed: true,
            items: [
              {
                id: 'item-c1',
                title: 'Item C.1',
                items: []
              }
            ]
          }
        ];

        $scope.selectedItem = $scope.treeItems[0].items[0];

        $scope.callbacks = {
          accept: function (sourceNodeScope, destNodesScope, destIndex) {
            return destNodesScope && !destNodesScope.nodrop;
          },

          dragStart: function (event) {
            var sourceItem = event.source.nodeScope.$modelValue;
            $log.info('start dragging ' + sourceItem.title);
          },

          dragStop: function (event) {
            var sourceItem = event.source.nodeScope.$modelValue;
            $log.info('stop dragging ' + sourceItem.title);
            $scope.selectedItem = sourceItem;
          },

          dropped: function (event) {
            var source = event.source,
              dest = event.dest;
            if (source.nodeScope && dest.nodesScope) {
              var sourceItem = source.nodeScope.$modelValue;
              var destItem = dest.nodesScope.$nodeScope ? dest.nodesScope.$nodeScope.$modelValue : {title: 'root'};
              var destIndex = dest.index;
              $log.info('dropped ' + sourceItem.title + ' into ' + destItem.title + ' at index ' + destIndex);
            }
          }
        };
      }
    ]
  );
}());
