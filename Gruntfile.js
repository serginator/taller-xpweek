"use strict";

module.exports = function(grunt) {

	var SRC_DIR = 'src/',
			SCRIPTS_DIR = SRC_DIR + 'lib/',
			ALL_STYLES = SRC_DIR + 'css/**/*.css',
			TESTS_DIR = SRC_DIR + 'test/',
			UNIT_TESTS_FILES = TESTS_DIR + 'unit/**/*.js',
			BDD_TESTS_FILES = TESTS_DIR + 'bdd/*.js';

	grunt.initConfig({
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
						console: true
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
				tasks: ['jshint:core']
			},
			jquery: {
				files: [SCRIPTS_DIR + 'zepto_jquery/**/*.js'],
				tasks: ['jshint:jquery']
			},
			knockout: {
				files: [SCRIPTS_DIR + 'knockout/**/*.js'],
				tasks: ['jshint:knockout']
			},
			styles: {
				files: [ALL_STYLES],
				tasks: ['csslint']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'csslint',
		'jshint'
	]);
};
