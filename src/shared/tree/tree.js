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

        /*
        * jstree directive
        * via http://plnkr.co/edit/xHIc4J?p=preview
        */
        .directive('hippo.theme.tree', [function() {
            return {
                restrict: 'A',
                scope: {
                    data: '='
                },
                template: '<div id="filter">Filter did not load.</div>',
                controller: function($scope) {
                    this.setSelectedItem = function(itemId) {
                        //$scope.$parent.setSelectedItemId(itemId);
                    };
                },
                link: function (scope, element, attrs, treeCtrl) {
                    function selectFirstElement(list) {
                        var item = list[0] || {};
                        item.state = item.state || {};
                        item.state.selected = item.state.selected || true;
                    }

                    function addLevelInfo(list, level) {
                        level = level || 0;
                        _.each(list, function (item) {
                            item.li_attr = {
                                'data-level': level
                            };

                            if (item.children) {
                                addLevelInfo(item.children, (level + 1));
                            }
                        });
                    }

                    scope.$watch('data', function() {
                        // select first item by default
                        selectFirstElement(scope.data);
                        addLevelInfo(scope.data);

                        console.log(scope.data);

                        element.jstree('destroy');
                        element.jstree({
                            plugins : [ 'themes' ],
                            core: {
                                data: scope.data
                            },
                            themes: {
                                theme: 'hippo'
                            }
                        }).bind('select_node.jstree', function(event, item) {
                            treeCtrl.setSelectedItem(item.node.id);
                        }).bind('activate_node.jstree', function(event, node) {
                            // remove active classes
                            node.instance.element.find('.jstree-node').removeClass('active');

                            // set active class
                            $('#' + node.node.id, element).addClass('active');

                        }).jstree('set_theme', 'hippo');
                    }, true);
                }
            };
        }]);
})();