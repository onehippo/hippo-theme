// Tests exist alongside the component they are testing with no separate test directory required; the build process should be sophisticated enough to handle this.
// via https://github.com/ngbp/ng-boilerplate#philosophy

module.exports = function (config) {

    var hippo = {
        bowerComponents : 'components'
    };

    config.set({
        basePath: '',
        frameworks: ['jasmine'],

        // files to load in the browser
        files: [
            // external sources
            'http://maps.google.com/maps/api/js?sensor=false&language=en-US',
            'http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0.2/src/markerclusterer_compiled.js',

            hippo.bowerComponents + '/underscore/underscore.js',

            // components
            hippo.bowerComponents + '/jquery/jquery.js',
            hippo.bowerComponents + '/jasmine-jquery/lib/jasmine-jquery.js',
            hippo.bowerComponents + '/angular/angular.js',
            hippo.bowerComponents + '/angular-mocks/angular-mocks.js',
            hippo.bowerComponents + '/angular-bootstrap/**/*.js',
            hippo.bowerComponents + '/js-detect-ie/detect-ie.js',
            hippo.bowerComponents + '/underscore/underscore.js',
            hippo.bowerComponents + '/jstree/dist/jstree.js',
            hippo.bowerComponents + '/hippo-plugins/dist/js/main.js',

            'src/js/main.js',
            'src/shared/**/*.js',
        ],

        // generate js files from html templates to expose them during testing
        preprocessors: {
            '**/*.html': 'ng-html2js'
        },

        // https://github.com/karma-runner/karma-ng-html2js-preprocessor#configuration
        ngHtml2JsPreprocessor: {
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            //moduleName: 'hippo.templates'
        },

        // files to exclude
        exclude: [],

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        port: 9876,
        browsers: ['PhantomJS', 'Chrome'],
        reporters: 'dots'
    });
};
