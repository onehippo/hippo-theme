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
                items: [{
                    text: 'Item 1.1'
                }, {
                    text: 'Item 1.2',
                    items: [{
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

    // TODO add unit tests!

});