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
                    'dist/css/main.css': 'src/less/main.less'
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
                src: ['!**/*.spec.js'],
                dest: 'dist/'
            }
        },

        // jshint
        jshint: {
            all: [
                'src/**/*.js',
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

        concat: {
            dist: {
                src: [
                    'src/js/main.js',
                    'src/shared/chart/chart.js',
                    'src/shared/divider/divider.js',
                    'src/shared/focus-me/focus-me.js',
                    'src/shared/map/map.js',
                    'src/shared/panel-default/panel-default.js',
                    'src/shared/responsive/responsive.js',
                    'src/shared/select-box/select-box.js',
                    'src/shared/urlparser/urlparser.js'
                ],
                dest: 'dist/js/main.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/js/main.min.js': ['dist/js/main.js']
                }
            }
        },

        cssmin: {
            options: {
                report: 'min'
            },
            dist: {
                files: {
                    'dist/css/main.min.css': ['dist/css/main.css']
                }
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
            'less',
            'concat:dist',
            'uglify:dist',
            'cssmin:dist',
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
