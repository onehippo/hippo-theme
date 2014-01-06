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
                    'dist/angular-plugins.css': 'less/main.less'
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
                    'shared/**/*.js',
                    'shared/**/*.html',
                    '*.html',
                    '*.css'
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
        }

    });

    // default
    grunt.registerTask('default', ['build']);

    // build
    grunt.registerTask('build', function (target) {
        var tasks = [
            'jshint',
            'clean',
            'copy',
            'less'
        ];

        grunt.task.run(tasks);
    });

};
