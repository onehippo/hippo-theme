describe('tree', function () {

    var scope, $compile;
    var element;

    beforeEach(module('hippo.theme'));

    beforeEach(inject(function ($rootScope, _$compile_) {
        scope = $rootScope;
        $compile = _$compile_;

        element = angular.element(
            '<div>' + 
                '<div hippo.theme.tree data="treeItems" on-select="setSelected(itemId)"></div>' + 
            '</div>');

        scope.treeItems = [
            {
                text: 'Item 1',
                children: [{
                    text: 'Item 1.1'
                }, {
                    text: 'Item 1.2',
                    children: [{
                        text: 'Item 1.2.1'
                    }, {
                        text: 'Item 1.2.2'
                    }, {
                        text: 'Item 1.2.3'
                    }]
                }, {
                    text: 'Item 1.3'
                }]
            }, {
                text: 'Item 2'
            }, {
                text: 'Item 3'
            }
        ];
    }));

    function createTree() {
        $compile(element)(scope);
        scope.$digest();
        return element.find('div.jstree-hippo');
    }

    it('should be created', function () {
        var tree = createTree();
        expect(tree.find('.jstree-container-ul').length).toEqual(1);
    });

    it('should contain 3 root nodes', function () {
        var tree = createTree();
        expect(tree.find('.jstree-container-ul').children('li').length).toEqual(3);
    });

    it('should contain 1 collapsable node', function () {
        var tree = createTree();
        expect(tree.find('.jstree-container-ul').children('li:not(.jstree-leaf)').length).toEqual(1);
    });

    it('should contain 2 leaf nodes at root level', function () {
        var tree = createTree();
        expect(tree.find('.jstree-container-ul').children('li.jstree-leaf').length).toEqual(2);
    });

    it('should have the first node marked as active by default', function () {
        var tree = createTree();
        expect(tree.find('.jstree-container-ul').children('li').first().hasClass('active')).toBeTruthy();
    });

    it('should have a second node with the visible label \'Item 2\'', function () {
        var tree = createTree();
        expect(tree.find('.jstree-container-ul').children('li').eq(1).find('a').text()).toBe('Item 2');
    });

});