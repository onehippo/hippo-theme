/*
 * Copyright 2014 Hippo B.V. (http://www.onehippo.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

module.exports = function (grunt) {

    var userhome = require('userhome');

    // display execution time of each task
    require('time-grunt')(grunt);

    // load all grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var cfg = {
        tmpDir: '.tmp',
        demoRepoDir: 'hippo-theme-demo',
        demoSrc: 'demo/src',
        demoDist: 'demo/dist'
    };

    cfg.tmpRepoDir = userhome(cfg.tmpDir, cfg.demoDist, cfg.demoRepoDir);

    grunt.initConfig({
        // Configuration
        cfg: cfg,
        userhome: userhome,

        // Watch for file changes and run corresponding tasks
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: ['src/**/*.less'],
                tasks: ['lintspaces:less', 'less']
            },
            html: {
                files: ['<%= cfg.demoSrc %>/**/*.html']
            },
            js: {
                files: ['src/**/*.js', '!**/*.spec.js'],
                tasks: ['concat:dist', 'uglify:dist']
            },
            demoJs: {
                files: ['<%= cfg.demoSrc %>/js/**/*.js']
            },
            images: {
                files: ['src/images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        },

        // clean target (distribution) folder
        clean: {
            bower: [ 'components/**' ],
            dist: [ 'dist/**/*' ],
            demo: ['<%= cfg.demoDist %>' ]
        },

        // Check if JS files are according to conventions specified in .jshintrc
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

        // Concat files
        concat: {
            options: {
                stripBanners: true
            },
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
                    'src/shared/tree/tree.js',
                    'src/shared/confirmation-dialog/confirmation-dialog.js'
                ],
                dest: 'dist/js/main.js'
            }
        },

        // Minify JS files
        uglify: {
            options: {
                preserveComments: 'some'
            },
            dist: {
                files: {
                    'dist/js/main.min.js': ['dist/js/main.js']
                }
            }
        },

        // Check if Less fils have correct spaces
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

        // Compile LessCSS to CSS.
        less: {
            src: {
                files: {
                    'dist/css/main.css': 'src/less/main.less'
                }
            }
        },

        // Minify CSS files
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

        // Minify images
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },

        // Copy files
        copy: {
            demo: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= cfg.demoSrc %>',
                        src: ['**/*.html'],
                        dest: '<%= cfg.demoDist %>/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/images',
                        src: ['**/*'],
                        dest: '<%= cfg.demoDist %>/images/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/fonts',
                        src: ['**/*'],
                        dest: '<%= cfg.demoDist %>/fonts/'
                    }
                ]
            },

            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'components/bootstrap/fonts',
                        src: ['**/*'],
                        dest: 'dist/fonts/'
                    },
                    {
                        expand: true,
                        cwd: 'components/font-awesome/fonts',
                        src: ['**/*'],
                        dest: 'dist/fonts/'
                    }
                ]
            },

            toDemoRepo: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= cfg.demoDist %>',
                        src: [
                            '**/*'
                        ],
                        dest: '<%= cfg.tmpRepoDir %>'
                    }
                ]
            }
        },

        useminPrepare: {
            options: {
                dest: '<%= cfg.demoDist %>'
            },

            html: '<%= cfg.demoSrc %>/index.html'
        },

        usemin: {
            options: {
                assetsDirs: ['<%= cfg.demoDist %>']
            },

            html: ['<%= cfg.demoDist %>/index.html']
        },

        // Testing with karma
        karma: {
            options: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },

            single: {
                singleRun: true,
                browsers: ['PhantomJS']
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
                hostname: '0.0.0.0',
                open: 'http://localhost:9000/#/'
            },
            demo: {
                options: {
                    base: [
                        '<%= cfg.demoSrc %>',
                        '.'
                    ]
                }
            },
            dist: {
                options: {
                    base: [
                        '<%= cfg.demoDist %>'
                    ],
                    keepalive: true
                }
            }
        },

        // Execute commands, in this case to commit the demo to our github page: onehippo.github.io
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

        // Angular Documentation
        ngdocs: {
            options: {
                dest: '<%= cfg.demoDist %>/docs',
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
        }
    });

    // default
    grunt.registerTask('default', [
        'build:demo'
    ]);

    // build dist
    grunt.registerTask('build:dist', 'Build the distribution', [
        'jshint',
        'lintspaces:less',
        'clean:dist',
        'imagemin',
        'copy:fonts',
        'less',
        'concat:dist',
        'uglify:dist',
        'cssmin:dist'
    ]);

    // build demo
    grunt.registerTask('build:demo', 'Build and test the demo for github page', [
        'build:dist',
        'clean:demo',
        'test',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'cssmin:generated',
        'copy:demo',
        'usemin',
        'ngdocs'
    ]);

    // server with demo page
    grunt.registerTask('server:demo', 'Build, test, and show the demo continuously', [
        'build:demo',
        'connect:demo',
        'watch'
    ]);

    grunt.registerTask('server:dist', 'Build, test, and show the demo continuously', [
        'build:demo',
        'connect:dist'
    ]);

    // test
    grunt.registerTask('test', 'Test the source code', [
        'karma:single'
    ]);

    grunt.registerTask('test:continuous', 'Test the source code continuously', [
        'karma:continuous'
    ]);

    // publish
    grunt.registerTask('publish', 'Publish the demo online', [
        'build:demo',
        'shell:cloneDemo',
        'copy:toDemoRepo',
        'shell:commitDemo',
        'shell:pushDemo'
    ]);
};
