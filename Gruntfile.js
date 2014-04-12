/**
Gruntfile designed for browser-only modules.
*/

module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			default: {
				options: {
					hostname: 'localhost',
					port: 8000,
					keepalive: true,
					livereload: true,
					open: 'http://localhost:8000',
				}
			},
		},

		bower: {
			target: {
				rjsConfig: 'amdconfig.js',
				options: {
					baseUrl: './src'
				}
			}
		},

		simplemocha: {
			options: {
			//	globals: ['should'],
				timeout: 3000,
				ignoreLeaks: false,
			//	grep: '*-test',
				ui: 'bdd',
				reporter: 'dot'
			},

			all: { src: ['test/*.js'] }
		},

		yuidoc: {
			compile: {
				name: 'backbone-ui-resizable',
				version: '0.0.0',
			//	description: '',
			// 	url: '',
				options: {
					paths: 'src/',
				//	themedir: 'path/to/custom/theme/',
					outdir: 'docs/'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				force: true,
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},

			// tests
			test: {
				src: ['test/**/*.js']
			},

			// src
			src: {
				src: ['src/**/*.js']
			}
		},

		watch: {
			live: {
				files: ['amdconfig.js', 'src/**/*.js', 'test/**', 'demo/**', 'docs/**', 'Gruntfile.js'],
				options: {
					livereload: true
				},
				tasks: ['jshint:gruntfile', 'jshint:src']
			},

			bower: {
				files: ['bower.json'],
				tasks: ['bower']
			}
		},

		requirejs: {
			// run r.js to generate a single file as the output
			// minifying and inlining all dependencies.
			file: {
				options: {
					// base url where to look for module files
					// and relative to which the module paths will be defined
					// (must coincide with that defined in mainConfigFile)
					baseUrl: './src',
					// module name
					name: 'backbone-ui-resizable',
					// output here
					out: './built/backbone-ui-resizable.js',
					// config file
					mainConfigFile: 'amdconfig.js',

					// include these modules
					include: [],

					// exclude these modules AND their dependencies
					// (excluding your bower dependencies)
					exclude: ["lodash", "lowercase-backbone", "jquery-ui", "jquery", "backbone-ui-draggable"],

					// excludeShallow
					excludeShallow: [],

					optimize: 'uglify2',

					pragmas: {
						exclude: true,
					},
				}
			},


			full: {
				options: {
					// base url where to look for module files
					// and relative to which the module paths will be defined
					// (must coincide with that defined in mainConfigFile)
					baseUrl: './src',
					// module name
					name: 'backbone-ui-resizable',
					// output here
					out: './built/backbone-ui-resizable.full.js',
					// config file
					mainConfigFile: 'amdconfig.js',

					// include these modules
					include: [],

					// exclude these modules AND their dependencies
					// (excluding your bower dependencies)
					exclude: ["lodash", "lowercase-backbone", "jquery-ui", "jquery", "backbone-ui-draggable"],

					// excludeShallow
					excludeShallow: [],

					optimize: 'none',

					pragmas: {
						exclude: true,
					},
				}
			},

			project: {
				options: {
					// source files
					appDir: 'src/',
					// output here:
					dir: 'built/project/',
					mainConfigFile: 'amdconfig.js',

					// do not copy these files
					fileExclusionRegExp: /^\./,
				}
			}
		}
	});

	/**
	 * Task loading
	 */
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.loadNpmTasks('grunt-bower-requirejs');
	/**
	Gets dependencies from bower.json and puts them into the require.js
	configuration script (amdconfig.js).
	*/

	grunt.loadNpmTasks('grunt-simple-mocha');

	/**
	Auxiliary task that starts a server in a child process.
	*/
	grunt.registerTask('child-process-server', function () {
		// start the server on a child process
		// so that it does not block the thread.
		grunt.util.spawn({
			cmd: 'grunt',
			args: ['connect']
		});
	});


	// mocha tests
	grunt.registerTask('mocha', 'simplemocha');

	// full live
	grunt.registerTask('live', ['child-process-server', 'watch:live']);
	/**
	[1] Starts a server as a child process
	[2] Starts watching files.
	*/

	grunt.registerTask('default', ['bower', 'yuidoc', 'jshint:gruntfile', 'jshint:src', 'requirejs', 'live']);
};
