(function () {
    'use strict';

    $.ajax({
        url: 'modules.json',
        dataType: 'json'
    }).done(function (data) {
                var includes = data.includes,
                    modules = data.modules,
                    app = data.application;

                $.each(modules, function(name, dependencies) {
                    angular.module(name, dependencies);
                });

                $.each(includes, function (name, include) {
                    if ($.isArray(include)) {
                        loadScripts(include);
                    } else {
                        loadModules(include.items, include.prefix);
                    }
                });

                $('head').append('<script>angular.bootstrap(document.getElementById(\'container\'), [\'' + app + '\']);</' + 'script>');
            });

    function loadModules(items, prefix) {
        $.each(items, function (index, component) {
            var folder, files;

            if (typeof component !== 'string') {
                folder = component.component;
                if (component.file) {
                    if ($.isArray(component.file)) {
                        files = component.file;
                    } else {
                        files = [ component.file ];
                    }
                } else {
                    files = [ folder + '.js' ];
                }
                if (!isBrowser(component.browser)) {
                    return;
                }
            } else {
                folder = component;
                files = [ component + '.js' ];
            }
            $.each(files, function (index, file) {
                getScript((prefix ? prefix + '/' : '') + folder + '/' + file);
            });
        });
    }

    function isBrowser(browser) {
        if (!browser) {
            return true;
        }
        switch (browser) {
            case 'IE':
                if (!IE.isTheBrowser) {
                    return false;
                }
                break;
            case 'IE <= 8':
                if (!IE.isTheBrowser) {
                    return false;
                }
                switch (IE.actualVersion) {
                    case '9':
                    case '10':
                        return false;
                }
                break;
        }
        return true;
    }

    function loadScripts(items) {
        $.each(items, function (index, url) {
            getScript(url);
        });
    }

    function getScript(url) {
        $('head').append('<script src=\"' + url + '\" />');
    }

})();
