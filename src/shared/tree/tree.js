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

    angular.module('hippo.theme')

        /**
         * @ngdoc directive
         * @name hippo.theme.directive:tree
         * @restrict A
         *
         * @description
         * Tree component for the Hippo Theme based on [NestedSortable](https://github.com/JimLiu/Angular-NestedSortable).
         *
         * @param {array} items The items to use for the Tree. Each item is an object with `title` (String) and `items` (Array) property.
         * @param {Object} selectedItemId The id of the item that should be marked as selected.
         * @param {callbacks} callbacks The available callbacks. A list of all available callbacks is available at
         * the [Hippo Theme demo](http://onehippo.github.io/hippo-theme-demo/) page.
         */
        .directive('hippo.theme.tree', ['$compile', '$templateCache', function($compile, $templateCache) {
            $templateCache.put('hippo.theme.tree.include', ''
                + '<div ui-tree-handle>'
                + '  <div hippo.theme.tree.template></div>'
                + '</div>'
                + '<ol ui-tree-nodes ng-model="item.items" ng-show="!collapsed">'
                + '  <li ng-repeat="item in item.items" ui-tree-node ng-include="\'hippo.theme.tree.include\'" data-ng-class="{active: selectedItemId === item.id}"></li>'
                + '</ol>'
            );

            return {
                restrict: 'A',
                transclude: true,
                scope: {
                    treeItems: '=items',
                    options: '=callbacks',
                    selectedItemId: '='
                },
                template: ''
                    + '<div ui-tree="options">'
                    + '  <ol ui-tree-nodes ng-model="treeItems">'
                    + '    <li ng-repeat="item in treeItems" ui-tree-node ng-include="\'hippo.theme.tree.include\'" data-ng-class="{active: selectedItemId === item.id}"></li>'
                    + '  </ol>'
                    + '</div>',
                controller: 'hippo.theme.tree.TreeCtrl'
            };
        }])

        .controller('hippo.theme.tree.TreeCtrl', ['$transclude', function($transclude) {
            this.renderTreeTemplate = $transclude;
        }])

        .directive('hippo.theme.tree.template', function() {
            return {
                require: '^hippo.theme.tree',
                link: function(scope, element, attrs, controller) {
                    controller.renderTreeTemplate(scope, function(dom) {
                        element.replaceWith(dom);
                    });
                }
            };
        });

})();
