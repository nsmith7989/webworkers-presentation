module.exports = function (grunt) {

	"use strict";

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dev: {
				options: {
					sourceComments: 'map',
					outputStyle: 'expanded'
				},
				files: {
					'css/style.css': 'sass/style.scss'
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'css/style.css': 'sass/style.scss'
				}
			}
		},

		autoprefixer: {
			single_file: {
				options: {
					browsers: ['last 4 version', 'ie 7' , 'ie 8', 'ie 9']
				},
				src: 'css/style.css'
			}
		},



		watch: {

			css: {
				files: ['sass/**/*.scss'],
				tasks: ['sass:dev','autoprefixer']
			},

			fonts: {
				files: ['fonts/*.*'],
				tasks: ['fontface']
			},

			options: {
				spawn: false
			}
		},

		fontface: {
			dest: {
				options: {
					template: '@include rf-font-face($font-family: {{font}}, $file: {{font}}, $short-name: {{font}}, $serif: sans);'
				}
			}

		},


		browser_sync: {
			dev: {
				bsFiles: {
					src: [
                        '*/*.css',
						'*/**.html'
                    ]
				},
				options: {
					watchTask: true
				}
			}
		}


	});

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-fontface');

	// Default task(s).
	grunt.registerTask('style', ['sass:dev', 'autoprefixer']);
	grunt.registerTask('default', ['browser_sync','watch']);

};
