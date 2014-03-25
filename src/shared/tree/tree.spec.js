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
describe('tree', function () {

    var scope, $compile;
    var element;

    beforeEach(module('hippo.theme'));

    beforeEach(inject(function ($rootScope, _$compile_) {
        scope = $rootScope;
        $compile = _$compile_;

        element = angular.element('<div hippo.theme.tree items="treeItems" callbacks="callbacks">{{ item.title }}</div>');

        scope.treeItems = [{
            title: 'Item 1',
            items: [{
                    title: 'Item 1.1'
                }, {
                    title: 'Item 1.2',
                    items: [{
                            title: 'Item 1.2.1'
                        }, {
                            title: 'Item 1.2.2'
                        }, {
                            title: 'Item 1.2.3'
                        }
                    ]
                }, {
                    title: 'Item 1.3'
                }
            ]
            }, {
                title: 'Item 2'
            }, {
                title: 'Item 3'
            }
        ];

        scope.callbacks = {};
    }));

    function createTree() {
        $compile(element)(scope);
        scope.$digest();
        return element.find('> ol.nestedSortable-list');
    }

    it('should be created', function () {
        var tree = createTree();
        expect(tree.length).toEqual(1);
    });


    it('should contain 3 root nodes', function () {
        var tree = createTree();
        expect(tree.children('li').length).toEqual(3);
    });

    it('should contain a first item with subitems', function () {
        var tree = createTree();
        expect(tree.children('li').eq(0).children('ol').children('li').length).toEqual(3);
    });


    it('should contain 2 leaf nodes at root level', function () {
        var tree = createTree();

        var itemsWithoutChildren = 0;
        tree.children('li').each(function (index, element) {
            var numChildren = $('ol', element).children('li').length;
            if (!numChildren) {
                itemsWithoutChildren += 1;
            }
        });

        expect(itemsWithoutChildren).toBe(2);
    });

    it('should have a second node with the visible label \'Item 2\'', function () {
        var tree = createTree();
        expect(tree.children('li').eq(1).find('span').text()).toBe('Item 2');
    });

});
