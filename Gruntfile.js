'use strict';
module.exports = function (grunt) {

    // display execution time of each task
    require('time-grunt')(grunt);

    // load all grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    var cfg = {
        exampleDir: 'example'
    };

    // project configuration
    grunt.initConfig({
        // configuration
        cfg: cfg,

        // compile less files for the app and modules
        less: {
            src: {
                files: {
                    'dist/css/hippo-theme.css': 'src/less/main.less'
                }
            }
        },

        // clean target (distribution) folder
        clean: [ 'dist/**/*' ],

        // copy files
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: [
                    'js/loader.js',
		            'js/hippo-theme.js',
                    'shared/**/*.js',
                    'shared/**/*.html',
                    'css/*.css',
                    '!**/*.spec.js'
                ],
                dest: 'dist/'
            }
        },

        // jshint
        jshint: {
            all: [
                'src/js/loader.js',
                'src/shared/**/*.js',
                '!**/*.spec.js'
            ],
            options: {
                'jshintrc': true
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
        },

        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0'
            },
            example: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '')
                        ];
                    }
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>/example/'
            }
        },
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

    // server with example
    grunt.registerTask('server', ['build', 'open', 'connect:example:keepalive']);

    // test
    grunt.registerTask('test:unit', [
        'karma:single'
    ]);

    grunt.registerTask('test:unit:continuous', [
        'karma:continuous'
    ]);

};
