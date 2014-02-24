'use strict';
module.exports = function (grunt) {

    var userhome = require('userhome');

    // display execution time of each task
    require('time-grunt')(grunt);

    // load all grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    var cfg = {
        exampleDir: 'demo',
        demoRepoDir: 'hippo-theme-demo',
        tmpDir: '.tmp'
    };
    cfg.tmpRepoDir = userhome(cfg.tmpDir, cfg.exampleDir, cfg.demoRepoDir);

    // project configuration
    grunt.initConfig({
        // configuration
        cfg: cfg,
        userhome: userhome,

        // compile less files for the app and modules
        less: {
            src: {
                files: {
                    'dist/css/main.css': 'src/less/main.less'
                }
            }
        },

        // clean target (distribution) folder
        clean: {
            dist: [ 'dist/**/*' ],
            demo: ['<%= cfg.exampleDir %>' ]
        },
        
        // copy files
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: ['!**/*.spec.js'],
                dest: 'dist/'
            },

            demo: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: [
                            '**/*',
                        ],
                        dest: '<%= cfg.exampleDir %>/components/hippo-theme/dist'
                    },
                    {
                        expand: true,
                        src: [
                            'components/**/*',
                            '!components/font-awesome/src/**/*'
                        ],
                        dest: '<%= cfg.exampleDir %>/'
                    },
                    {
                        expand: true,
                        cwd: 'src/demo',
                        src: [
                            '**/*',
                        ],
                        dest: '<%= cfg.exampleDir %>/'
                    }
                ]
            },

            toDemoRepo: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= cfg.exampleDir %>',
                        src: [
                            '**/*',
                        ],
                        dest: '<%= cfg.tmpRepoDir %>'
                    }
                ]
            }
        },

        // watch
        watch: {
            less: {
                options: {
                    livereload: true
                },
                files: [
                    'src/**/*.less'
                ],
                tasks: [
                    'less',
                    'lintspaces:less',
                    'copy:demo'
                ]
            },
            html: {
                options: {
                    livereload: true
                },
                files: [
                    'src/**/*.html',
                ],
                tasks: [
                    'copy:demo'
                ]
            },
            js: {
                options: {
                    livereload: true
                },
                files: [
                    'src/**/*.js',
                    '!**/*.spec.js',
                ],
                tasks: [
                    'clean:dist',
                    'copy:demo',
                    'concat:dist',
                    'uglify:dist',
                    'copy:demo'
                ]
            }
        },

        // jshint
        jshint: {
            all: [
                'src/**/*.js',
                '!**/*.spec.js'
            ],
            options: {
                'jshintrc': true,
                reporter: require('jshint-stylish')
            }
        },

        // testing with karma
        karma: {
            options: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },

            single: {
                singleRun: true,
                browsers: ['PhantomJS', 'Firefox']
            },

            continuous: {
                singleRun: false,
                browsers: ['PhantomJS']
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
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
                path: 'http://localhost:<%= connect.options.port %>/<%= cfg.exampleDir %>/'
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
                    'src/shared/urlparser/urlparser.js',
                    'src/shared/tree/tree.js'
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
        },

        lintspaces: {
            less: {
                src: [
                    'src/**/*.less'
                ],
                options: {
                    indentation: 'spaces',
                    spaces: 4,
                    ignores: ['js-comments']
                }
            }
        },

        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            cloneDemo: {
                command: 'rm -R <%= userhome(cfg.tmpDir) %> && mkdir -p <%= cfg.tmpRepoDir %> && cd <%= cfg.tmpRepoDir %> && git clone git@github.com:onehippo/hippo-theme-demo.git .'
            },

            commitDemo: {
                command: [
                    'echo <%= cfg.tmpRepoDir %>',
                    'git add .',
                    'git commit -m "New build"'
                ].join('&&'),
                options: {
                    execOptions: {
                        cwd: '<%= cfg.tmpRepoDir %>'
                    }
                }
            },

            pushDemo: {
                command: 'git push origin gh-pages',
                options: {
                    execOptions: {
                        cwd: '<%= cfg.tmpRepoDir %>'
                    }
                }
            }
        },

        // ngdocs
        ngdocs: {
            options: {
                dest: '<%= cfg.exampleDir %>/docs',
                scripts: ['angular.js'],
                html5Mode: false,
                startPage: '/api',
                title: 'Hippo Theme'
            },
            
            api: {
                title: 'API reference',
                src: ['src/shared/**/*.js'],
                api: true
            }
        },
    });

    // default
    grunt.registerTask('default', ['build:demo']);

    // build dist
    grunt.registerTask('build:dist', function (target) {
        var tasks = [
            'jshint',
            'karma:single',
            'clean:dist',
            'copy',
            'less',
            'concat:dist',
            'lintspaces:less',
            'uglify:dist',
            'cssmin:dist'
        ];

        grunt.task.run(tasks);
    });

    // build demo
    grunt.registerTask('build:demo', function (target) {
        var tasks = [
            'clean:demo',
            'build:dist',
            'copy:demo',
        ];

        grunt.task.run(tasks);
    });

    // server with example
    grunt.registerTask('server:demo', ['build:demo', 'ngdocs', 'open', 'connect:example', 'watch']);

    // test
    grunt.registerTask('test:unit', [
        'karma:single'
    ]);

    grunt.registerTask('test:unit:continuous', [
        'karma:continuous'
    ]);

    grunt.registerTask('publish', [
        'build:demo',
        'ngdocs',
        'shell:cloneDemo',
        'copy:toDemoRepo', 
        'shell:commitDemo', 
        'shell:pushDemo'
    ]);
};
