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
                    data: '=',
                    onSelect: '&onSelect'
                },
                template: '<div id="filter">Filter did not load.</div>',
                link: function (scope, element, attrs, treeCtrl) {

                    // render js tree every time the provided data structure changes
                    scope.$watch('data', function() {
                        selectFirstElement(scope.data);
                        addLevelInfo(scope.data);
                        createJsTree(scope.data, element);
                    }, true);

                    function selectFirstElement(list) {
                        var item = list[0] || {};
                        item.state = item.state || {};
                        item.state.selected = item.state.selected || true;
                    }

                    function addLevelInfo(list, level) {
                        level = level || 1;
                        _.each(list, function (item) {
                            item.li_attr = {
                                'data-level': level
                            };

                            if (item.children) {
                                addLevelInfo(item.children, (level + 1));
                            }
                        });
                    }

                    function createJsTree(data, element) {
                        element.jstree('destroy');
                        element.bind('loaded.jstree', function (event) {
                            var tree = event.target;
                            $('.jstree-clicked', tree).closest('.jstree-node').addClass('active');
                        });
                        element.jstree({
                            plugins : [ 'themes' ],
                            core: {
                                data: data,
                                check_callback: true
                            },
                            themes: {
                                theme: 'hippo'
                            }
                        }).bind('activate_node.jstree', function(event, node) {
                            // remove active classes
                            node.instance.element.find('.jstree-node').removeClass('active');

                            // set active class
                            $('#' + node.node.id, element).addClass('active');

                            // trigger on select function
                            scope.onSelect({itemId: node.node.id});
                        }).bind("move_node.jstree", function (event, data) {
                            // TODO: set indenting levels
                            // TODO: always expand dom, otherwise this won't work! (or does it with the indenting levels?)
                            
                            // get JSON
                            var result = $.jstree.reference(element).get_json(element, {});
                            var jsonString = JSON.stringify(result);
                        }).jstree('set_theme', 'hippo');
                    }
                }
            };
        }]);
})();