(function () {
    'use strict';

    var config = {
        modulesFileSrc: ''
    };

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function filenameFromPath(path) {
        return path.substring(path.lastIndexOf('/') + 1);
    }

    function getConfigurationFile() {
        var scriptTags = scripts();
        for (var i = scriptTags.length - 1; i > 0; i --) {
            var filename = filenameFromPath(scriptTags[i].src);
            var dataMain = scriptTags[i].getAttribute('data-modules');

            if (filename == 'loader.js') {
                if (dataMain) {
                    config.modulesFileSrc = dataMain;
                } else {
                    throw 'No modules file specified for the plugin loader script. Example: <script src="loader.js" data-modules="modules.json"></script>';
                }
            }
        }
    }
    
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
                getScript((prefix ? prefix + '/' : '') + (folder ? folder + '/' : '') + file);
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

    function loader(config) {
        config = config || {};

        $.ajax({
            url: config.modulesFileSrc,
            dataType: 'json'
        }).done(function (data) {
            var includes = data.includes;

            $.each(includes, function (name, include) {
                if ($.isArray(include)) {
                    loadScripts(include);
                } else {
                    loadModules(include.items, include.prefix);
                }
            });

            // TODO: test if we still need to manually trigger the angular application to run
            //$('head').append('<script>angular.bootstrap(document.getElementById(\'container\'), [\'' + app + '\']);</' + 'script>');
        });
    }


    // setup config settings
    getConfigurationFile();

    // run with config info
    loader(config);

})();
