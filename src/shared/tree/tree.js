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
                        //addLevelInfo(scope.data);
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

                    function addLevelInfoToDom(tree, level) {
                        console.log('### Add level info to DOM ###');

                        level = level || 1;
                        $(tree).children('li').each(function (index, item) {
                            //console.log('Set level of: ', item);
                            $(item).attr('data-level', level);
                            //console.log('This item has been given a data-level attribute with value ' + level + ': ', item);
                            
                            console.log($(item).children('.jstree-children'));

                            $(item).children('.jstree-children').each(function (index, subTree) {
                                console.log('~~~~~~~ Children ~~~~~~~');
                                addLevelInfoToDom($(subTree), level + 1);
                            });
                        });
                    }

                    /*
                    <li role="treeitem" id="j2_10" class="jstree-node  jstree-open active">
                        <i class="jstree-icon jstree-ocl"></i>
                        <a class="jstree-anchor  jstree-clicked" href="#"><i class="jstree-icon jstree-themeicon"></i>Item A</a>

                        <ul role="group" class="jstree-children" style="">
                            <li role="treeitem" id="j2_11" class="jstree-node  jstree-leaf">
                                <i class="jstree-icon jstree-ocl"></i>
                                <a class="jstree-anchor" href="#"><i class="jstree-icon jstree-themeicon"></i>Item A.1</a>
                            </li>
                            <li role="treeitem" id="j2_12" class="jstree-node  jstree-closed">
                                <i class="jstree-icon jstree-ocl"></i>
                                <a class="jstree-anchor" href="#"><i class="jstree-icon jstree-themeicon"></i>Item A.2</a>
                            </li>
                            <li role="treeitem" id="j2_16" class="jstree-node  jstree-leaf jstree-last">
                                <i class="jstree-icon jstree-ocl"></i>
                                <a class="jstree-anchor" href="#"><i class="jstree-icon jstree-themeicon"></i>Item A.3</a>
                            </li>
                        </ul>
                    </li>
                    <li role="treeitem" id="j2_17" class="jstree-node  jstree-closed jstree-last" data-level="1">
                        <i class="jstree-icon jstree-ocl"></i>
                        <a class="jstree-anchor" href="#"><i class="jstree-icon jstree-themeicon"></i>Item B</a>
                    </li> 
                    */

                    function createJsTree(data, element) {
                        element.jstree('destroy');
                        element.on('loaded.jstree', function (event) {
                            var tree = event.target;
                            $('.jstree-clicked', tree).closest('.jstree-node').addClass('active');
                        });
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
                                    always_copy: "multitree"
                                }
                            }
                        }).on('open_node.jstree', function (event, node) {
                            addLevelInfoToDom(node.instance.element.children('ul'));
                        }).on('activate_node.jstree', function(event, node) {
                            // remove active classes
                            node.instance.element.find('.jstree-node').removeClass('active');

                            // set active class
                            $('#' + node.node.id, element).addClass('active');

                            // trigger on select function
                            scope.onSelect({itemId: node.node.id});
                        }).on("move_node.jstree", function (event, data) {
                            // get JSON
                            var result = $.jstree.reference(element).get_json(element, {});
                            var jsonString = JSON.stringify(result);
                            addLevelInfoToDom(data.instance.element.children('ul'));
                        }).on("after_open.jstree", function (event, data) {
                            var tree = event.target;
                            $('.jstree-clicked', tree).closest('.jstree-node').addClass('active');
                        }).jstree('set_theme', 'hippo');
                    }
                }
            };
        }]);
})();