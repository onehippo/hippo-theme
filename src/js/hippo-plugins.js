(function() {
    "use strict";

    angular.module('hippo.plugins', [])

    /*
     * 
     */
    .provider('URLBuilder', function() {
        this.prefix = 'components';
        this.exempt = [];

        this.setPrefix = function(prefix) {
            this.prefix = prefix;
        };

        this.useRoot = function(module) {
            this.exempt.push(module);
        };

        this.$get = function() {
            var prefix = this.prefix,
                exempt = this.exempt;
            return function buildUrl(module, path) {
                if (exempt.indexOf(module) < 0) {
                    console.log('resolving ' + path + ' for ' + module);
                    return prefix + '/' + module + '/dist/' + path;
                } else {
                    return 'src/' + path;
                }
            };
        };
    });
})();
