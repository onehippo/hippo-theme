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
                livereload: true,
                interrupt: true,
                livereloadOnError: false
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            less: {
                options: {
                    livereload: false
                },
                files: ['src/**/*.less'],
                tasks: ['less', 'autoprefixer', 'csslint', 'concat:css']
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
            },
            livereload: {
                files: [
                    '<%= cfg.demoSrc %>/**/*.html',
                    'dist/css/**/*.css'
                ]
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
                    'src/shared/**/*.js'
                ],
                dest: 'dist/js/main.js'
            },
            css: {
                src: ['.tmp/css/**/*.css'],
                dest: 'dist/css/main.css'
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

        // Compile LessCSS to CSS.
        less: {
            main: {
                files: {
                    '.tmp/css/main.css': 'src/less/main.less'
                }
            },
            vendors: {
                files: {
                    '.tmp/css/bootstrap.css': 'src/less/bootstrap.less',
                    '.tmp/css/font-awesome.css': 'src/less/font-awesome.less',
                    '.tmp/css/bootstrap-chosen.css': 'src/less/bootstrap-chosen.less'
                }
            }
        },

//         Comb less files
//         Should be combing less files but csscomb currently breaks on less mixins.
//        csscomb: {
//            options: {
//                config: '.csscomb.json'
//            },
//            src: {
//                expand: true,
//                cwd: 'src/',
//                src: ['**/*.less'],
//                dest: 'src/',
//            }
//        },

        // Lint the css output
        csslint: {
            lessOutput: {
                options: {
                    csslintrc: '.csslintrc'
                },

                src: ['.tmp/css/main.css']
            }
        },

        // Autoprefix vendor prefixes
        autoprefixer: {
            dist: {
                options: {
                    browsers: ['> 0%']
                },
                src: '.tmp/css/main.css',
                dest: '.tmp/css/main.css'
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
            src: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'src/images/'
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

            dist: {
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
                    },
                    {
                        expand: true,
                        cwd: 'src/images',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'dist/images/'
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
                hostname: '0.0.0.0',
                open: 'http://localhost:9000/#/'
            },
            demo: {
                options: {
                    livereload: 35729,
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
        'less',
        'autoprefixer',
        'csslint',
        'imagemin',
        'clean:dist',
        'copy:dist',
        'concat',
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
        'build:dist',
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
