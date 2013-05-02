"use strict";

module.exports = function(grunt) {

	var SRC_DIR = 'src/',
		SCRIPTS_DIR = SRC_DIR + 'lib/',
		ALL_STYLES = SRC_DIR + 'css/**/*.css',
		TESTS_DIR = SRC_DIR + 'test/',
		UNIT_TESTS_FILES = TESTS_DIR + 'unit/**/*.js',
		BDD_TESTS_FILES = TESTS_DIR + 'bdd/*.js',
		OUTPUT_DIR = 'dist/';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		csslint: {
			all: {
				files: {
					src: [ALL_STYLES]
				}
			}
		},
		jshint: {
			options: {
				// Neutral environment
				browser: false,
				node: false,
				jquery: false,
				strict: true,
				globalstrict: true,
				bitwise: true,
				camelcase: true,
				curly: false,
				eqeqeq: true,
				forin: true,
				latedef: true,
				newcap: true,
				noarg: true,
				nonew: true,
				undef: true,
				unused: true,
				white: false,
				trailing: false,
				maxparams: 3,
				maxstatements: 10,
				maxdepth: 2,
				maxcomplexity: 5
			},
			core: {
				options: {
					globals: {
						module: true,
						setTimeout: true, // TODO: fixme!
						localStorage: true // TODO: fixme!
					}
				},
				files: {
					src: [SCRIPTS_DIR + 'core/**/*.js']
				}
			},
			jquery: {
				options: {
					browser: true,
					jquery: true,
					globals: {
						module: true,
						require: true,
						console: true
					}
				},
				files: {
					src: [SCRIPTS_DIR + 'zepto_jquery/**/*.js']
				}
			},
			knockout: {
				options: {
					browser: true,
					globals: {
						module: true,
						require: true,
						console: true
					}
				},
				files: {
					src: [SCRIPTS_DIR + 'knockout/**/*.js']
				}
			},
			gruntfile: {
				options: {
					node: true,
					maxstatements: false
				},
				files: {
					src: ['Gruntfile.js']
				}
			},
			unit: {
				options: {
					node: true,
					expr: true,
					latedef: false,
					globals: {
						describe: true,
						beforeEach: true,
						afterEach: true,
						xdescribe: true,
						context: true,
						it: true,
						xit: true
					}
				},
				files: {
					src: [UNIT_TESTS_FILES]
				}
			},
			bdd: {
				options: {
					browser: true,
					jquery: true,
					expr: true,
					maxparams: 5,  // TODO: fixme!
					maxdepth: 3,  // TODO: fixme!
					maxstatements: 20,  // TODO: fixme!
					globals: {
						describe: true,
						beforeEach: true,
						afterEach: true,
						xdescribe: true,
						context: true,
						it: true,
						xit: true,
						chai: true,
						bdd: true,
						console: true,
						before: true
					}
				},
				files: {
					src: [BDD_TESTS_FILES]
				}
			}
		},
		watch: {
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['jshint:gruntfile']
			},
			bdd: {
				files: [BDD_TESTS_FILES],
				tasks: ['jshint:bdd']
			},
			unit: {
				files: [UNIT_TESTS_FILES],
				tasks: ['jshint:unit']
			},
			core: {
				files: [SCRIPTS_DIR + 'core/**/*.js'],
				tasks: ['jshint:core', 'simplemocha:dev']
			},
			jquery: {
				files: [SCRIPTS_DIR + 'zepto_jquery/**/*.js'],
				tasks: ['jshint:jquery', 'simplemocha:dev']
			},
			knockout: {
				files: [SCRIPTS_DIR + 'knockout/**/*.js'],
				tasks: ['jshint:knockout', 'simplemocha:dev']

			},
			styles: {
				files: [ALL_STYLES],
				tasks: ['csslint']
			}
		},
		simplemocha: {
			options: {
				timeout: 500, // Unit tests
				ui: 'bdd'
			},
			dev: {
				options: {
					reporter: 'dot'
				},
				files: {
					src: [UNIT_TESTS_FILES]
				}
			}
		},
		clean: [OUTPUT_DIR, 'build.zip'],
		copy: {
			main: {
				files: [
					{expand: true, cwd: SRC_DIR, src: ['img/**', '**/!(initial_*).html'], dest: OUTPUT_DIR},
					{expand: true, cwd: './', src: ['vendor/**/!(almond.js)'], dest: OUTPUT_DIR + 'js/' }
				]
			}
		},
		cssmin: {
			options: {
				report: 'gzip'
			},
			minify: {
				src: [ALL_STYLES],
				dest: "dist/css/<%= pkg.name %>.min.css"
			}
		},
		requirejs: {
			options: {
				baseUrl: SCRIPTS_DIR,
				cjsTranslate: true,
				useStrict: true,
				preserveLicenseComments: false,
				generateSourceMaps: true,
				optimize: 'uglify2',
				include: ['../../vendor/almond.js'] // runtime de requirejs
			},
			zeptoJQuery: {
				options: {
					name: 'zepto_jquery/main',
					insertRequire: ['zepto_jquery/main'],
					out: "dist/js/<%= pkg.name %>-zepto_jquery.min.js",
					uglify2: {
						report: 'gzip',
						mangle: {
							except: ['jQuery', 'Zepto']
						}
					}
				}
			},
			ko: {
				options: {
					name: 'knockout/main',
					insertRequire: ['knockout/main'],
					out: "dist/js/<%= pkg.name %>-ko.min.js",
					uglify2: {
						report: 'gzip',
						mangle: {
							except: ['ko']
						}
					}
				}
			}
		},
		karma: {
			options: {
				runnerPort: 9999,
				configFile: 'karma.conf.js'
			},
			ci: {
				singleRun: true,
				reporters: ['dots', 'junit'],
				browsers: ['PhantomJS', 'Firefox']
			}
		},
		compress: {
			main: {
				options: {
					archive: 'build.zip'
				},
				files: [
					{expand: true, cwd: 'dist/', src: ['**'], dest: 'todo/'}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-compress');


	grunt.registerTask('default', [
		'csslint',
		'jshint',
		'simplemocha:dev'
	]);

	grunt.registerTask('dist', [
		'clean',
		'cssmin',
		'requirejs',
		'copy'
	]);

	grunt.registerTask('build', [
		'default',
		'dist',
		'karma',
		'compress'
	]);
};
