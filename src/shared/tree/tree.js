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
         * Tree component for the Hippo Theme. It uses [jsTree](http://www.jstree.com/) to render the tree.
         * 
         * @param {object} data The data to use for the Tree.
         * @param {string=} onSelect The function to evaluate when a new node in the Tree is selected.
         * @param {string=} onMove The function to evaluate when a node in the Tree is moved.
         */
        .directive('hippo.theme.tree', [function() {
            return {
                restrict: 'A',
                scope: {
                    data: '=',
                    onSelect: '&onSelect',
                    onMove: '&onMove'
                },
                template: '<div id="filter"></div>',
                link: function (scope, element, attrs, treeCtrl) {
                    var isFirstRender = true;

                    // watch for incoming changes of the tree data structure.
                    // rerender the tree everytime the data changes.
                    scope.$watch('data', function() {
                        if (isFirstRender) {
                            selectFirstElement(scope.data);
                        }
                        addLevelInfo(scope.data);
                        createJsTree(scope.data, element);

                        // we use this variable to mark the first item as selected
                        // only for the first time rendering the tree
                        isFirstRender = false;
                    }, true);

                    // mark the first node in the tree as selected
                    function selectFirstElement(list) {
                        var item = list[0] || {};
                        item.state = item.state || {};
                        item.state.selected = item.state.selected || true;
                    }

                    // as we do not control the DOM, we use the `data-level`
                    // attribute to handle the indentation styling of each node.
                    // jsTree adds this attribute when we set the `li_attr` property.
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

                    // loop through the DOM of the tree and manually add the `data-level`
                    // attribute to each node
                    function addLevelInfoToDom(tree, level) {
                        level = level || 1;
                        $(tree).children('li').each(function (index, item) {
                            $(item).attr('data-level', level);
                            
                            $(item).children('.jstree-children').each(function (index, subTree) {
                                addLevelInfoToDom($(subTree), level + 1);
                            });
                        });
                    }

                    // add an `active` class to the selected node, so we can style it using Bootstrap
                    function markClickedNodeAsActive(tree) {
                        $(tree).find('.jstree-node').removeClass('active');
                        $('.jstree-clicked', tree).closest('.jstree-node').addClass('active');
                    }

                    // render the jsTree using the jsTree jQuery plugin
                    function createJsTree(data, element) {
                        // remove the previously rendered tree
                        element.jstree('destroy');

                        // detect the selected node and mark as active after the tree is loaded
                        element.on('loaded.jstree', function (event) {
                            markClickedNodeAsActive(event.target);
                        });

                        // execute the jsTree plugin
                        element.jstree({
                            plugins : [ 'themes', 'dnd', 'crrm' ],
                            core: {
                                data: data,
                                check_callback: true
                            },
                            themes: {
                                theme: 'hippo'
                            },
                            crrm: {
                                move: {
                                    always_copy: 'multitree'
                                }
                            }
                        }).on('open_node.jstree', function (event, node) {
                            // set the indentation classes when a node gets expanded
                            addLevelInfoToDom(node.instance.element.children('ul'));
                        }).on('activate_node.jstree', function(event, node) {
                            // a different node is selected / active
                            markClickedNodeAsActive(event.target);
                            scope.onSelect({itemId: node.node.id});
                        }).on("move_node.jstree", function (event, data) {
                            // update styling manually
                            addLevelInfoToDom(data.instance.element.children('ul'));
                            markClickedNodeAsActive(event.target);

                            // get info for moved node parents
                            var prevParent = $.jstree.reference(element).get_json(data.old_parent, {});
                            var newParent = $.jstree.reference(element).get_json(data.parent, {});

                            // info object to return
                            var nodeMoveInfo = {
                                prevParent: prevParent[0] || prevParent,
                                newParent: newParent[0] || newParent,
                                position: data.position
                            };

                            // apply the scope attribute function for onmove
                            scope.onMove({node: nodeMoveInfo});
                        }).on("after_open.jstree", function (event, data) {
                            // the node loses it's active class when moving inside a closed node
                            markClickedNodeAsActive(event.target);
                        }).jstree('set_theme', 'hippo');
                    }
                }
            };
        }]);
})();