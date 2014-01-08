'use strict';
module.exports = function (grunt) {

    // display execution time of each task
    require('time-grunt')(grunt);

    // load all grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // compile less files for the app and modules
        less: {
            src: {
                files: {
                    'dist/hippo-theme.css': 'less/main.less'
                }
            }
        },

        // clean target (distribution) folder
        clean: [ 'dist/*' ],

        // copy files
        copy: {
            main: {
                src: [
                    'loader.js',
		            'hippo-theme.js',
                    'shared/**/*.js',
                    'shared/**/*.html',
                    '*.html',
                    '*.css',
                    '!shared/**/*.spec.js'
                ],
                dest: 'dist/'
            }
        },

        // jshint
        jshint: {
            all: [
                'loader.js',
                'shared/**/*.js',
                '!**/*.spec.js'
            ],
            options: {
                "jshintrc": true
            }
        },

        // testing with karma
        karma: {
            options: {
                //logLevel: 'debug',
                configFile: 'karma.conf.js',
                autoWatch: true
            },

            single: {
                singleRun: true
            },

            continuous: {
                singleRun: false
            }
        }

    });

    // default
    grunt.registerTask('default', ['build']);

    // build
    grunt.registerTask('build', function (target) {
        var tasks = [
            'jshint',
            'karma:single',
            'clean',
            'copy',
            'less'
        ];

        grunt.task.run(tasks);
    });

    // test
    grunt.registerTask('test:unit', [
        'karma:single'
    ]);

    grunt.registerTask('test:unit:continuous', [
        'karma:continuous'
    ]);

};
