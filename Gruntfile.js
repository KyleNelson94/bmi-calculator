module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                title: "Yorkshire Water", // defaults to the name in package.json, or will use project directory's name
                success: true, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },
        notify: {
            custom: {
                options: {
                    title: "Success!",
                    message: "All tasks processed successfully."
                }      
            }
        },
		sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'library/css/styles.css': 'library/sass/styles.scss'
                }
            }
        },
		autoprefixer: {
			options: {
				browsers: ['last 4 version', 'Safari >= 5']
			},
            dist: {
				expand: true,
				cwd: 'library/css/',
				src: ['*.css'],
				dest: 'library/css/',
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'library/css/min/style.min.css' : ['library/css/styles.css']
				}
			}
		},
        concat: {
			js: {
				src: [ 'library/js/*js', '!library/js/test/*js' ],
				dest: 'library/js/min/scripts.js',
			},
		},
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'library/js/min/scripts.min.js': ['library/js/min/scripts.js']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            // define the files to lint
            files: ['library/js/scripts.js', 'test/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        /*ncftp_push: {
            default: {
                options: {
                    dest: '/public_html/dev/project/wp-content/themes/theme-name', // Destination path on ftp server
                    srcBase: '/', // Source base to trim from files
                    authFile: '.ftpconfig', // File to get ftp account info from
                    redial: 3, // Maximum retry attempts
                    ncftp: '', // Path to ncftpput
                    debug: false, // Log debug info?
                    debugFile: 'stdout', // file to log debug info to if enabled
                    join: '&&', // How to join the commands when there are multiple files
                    shellOptions: {} // options to pass to the shell task
                },
                files: [ // Enable Dynamic Expansion, Src matches are relative to this path, Actual Pattern(s) to match
                    {expand: true, cwd: './', src: ['library/'], dest: 'library/'}
                ]
            },
            dev: {
                options: {
                    authFile: '.ftpconfig' // You've created a local ftpauth file
                },
                files: [
                    {expand: true, cwd: '', src: ['/*']}
                ]
            }
        },*/
		watch: {
            css: {
				files: ['library/sass/**/*.scss'],
				tasks: ['sass', 'newer:autoprefixer:dist', 'cssmin', 'notify:custom'],
				options: {
					spawn: false,
				}
			},
			scripts: {
				files: ['library/js/*.js'],
				tasks: ['jshint', 'concat', 'uglify', 'notify:custom'],
				options: {
					spawn: false,
				},
			}
            /*ncftp_watch: {
                files: [
                    '/*'
                ],
                tasks: ['ncftp_watch:dev'],
                options: {
                    atBegin: true,
                    spawn: false,
                    interrupt: true,
                    debounceDelay: 500
                }
            }*/
		},
		browserSync: {
			dev: {
                bsFiles: {
                    src: ['library/css/styles.css', 'library/js/*.js', 'library/js/min/*.js', '*.html']
                },
                options: {
                    watchTask: true,
                    server: '.',
                    ghostMode: {
                        scroll: true,
                        links: true,
                        forms: true
                    }
                }
			}
		},
		tinyimg: {
			dynamic: {
                files: [{
                    expand: true,
                    cwd: 'library/images/',
                    src: ['**/*.{png,jpg,svg}'],
                    dest: 'library/images/'
                }]
			}
        },
        critical: {
            test: {
                options: {
                    base: './',
                    css: [
                        'library/css/styles.css'
                    ],
                    width: 1920,
                    height: 995
                },
                src: 'index.html',
                dest: 'library/css/critical.css'
            }
        }
	});

	
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin'); // Css minify
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch'); // Watches files for changes, run 'grunt watch' will pick up sass changes and compile css
	grunt.loadNpmTasks('grunt-browser-sync'); //Create server
	grunt.loadNpmTasks('grunt-autoprefixer'); // Use specified vendor prefixes for compiled CSS
	grunt.loadNpmTasks('grunt-newer'); // Add newer: infront of a task to only account for recently edited files
    grunt.loadNpmTasks('grunt-tinyimg'); // Image optimizer
    grunt.loadNpmTasks('grunt-critical');
    //grunt.loadNpmTasks('grunt-ncftp-push'); // Ftp push

    grunt.registerTask('test', ['jshint', 'qunit']);
	grunt.registerTask('default', ['sass', 'newer:autoprefixer:dist', 'jshint', 'qunit', 'concat', 'cssmin', 'uglify', 'tinyimg']);
	grunt.registerTask('serve', ['browserSync', 'watch']);
    grunt.registerTask('compress', ['tinyimg']);
    grunt.registerTask('criticalcss', ['critical']);
};