module.exports = function (grunt) {

	
	grunt.initConfig({

		destinationFolder : '../www/',
		sourceFolder : '../src/',


		// Uglify JS
	    // ====================
		uglify: {
			js: {
				options: {
					compress: false,
					mangle: false,
					beautify : true
				},
				files: {
					'<%= destinationFolder %>scripts.js': 
					[
						'<%= destinationFolder %>scripts.js'
					],
				}
			},


			// Uglify JS + Compress
	    	// ====================
			js_compress: {
				options: {
					compress: false
				},
				files: {
					'<%= destinationFolder %>scripts.js': 
					[
						'<%= destinationFolder %>scripts.js'
					],
				}
			},
		},


		// Concat - Network module JS files
		// ================================

		// Concatener les fichiers JS du module Network

		concat : {
			js: {
				files: {
					'<%= destinationFolder %>scripts.js':
					[
						'<%= sourceFolder %>scripts/libs/angular.js',
						'<%= sourceFolder %>scripts/libs/**.js',
						'<%= sourceFolder %>scripts/app/**/*.module.js',
						'<%= sourceFolder %>scripts/app/**/*.js',
					],
				}
			},
		},


		// NgAnnotate - Network module
		// ===========================

		// Add AngularJS dependency injection annotations

		ngAnnotate : {
			js: {
				files : {
					'<%= destinationFolder %>scripts.js' : [
						'<%= destinationFolder %>scripts.js'
					]
				}
			}
		},


		// Inline Angular templates
	    // ====================
		inline_angular_templates: {
			dist: {
				options: {
					base: '<%= sourceFolder %>',
					selector: '.inline-templates',
					method: 'replaceWith'
				},
				files: {
					'<%= destinationFolder %>index.html': ['<%= sourceFolder %>scripts/**/**.template.html']
				}
			}
		},

		
		// Copy
	    // ====================
		copy: {
			index: {
				files: [
					{
						src: '<%= sourceFolder %>index.html', 
						dest: '<%= destinationFolder %>index.html'
					},
				]
			},
		},


		
	    // LESS
	    // ====================
	    less: {
	    	all: {
	    		src: [
					'<%= sourceFolder %>styles/main.less',
	    		],
	    		dest: '<%= destinationFolder %>styles.css'
	    	},

	    	// + Compress
	    	all_compress: {
	    		options: {
	    			compress: true,
	    		},
	    		src: [
					'<%= sourceFolder %>styles/main.less'
	    		],
	    		dest: '<%= destinationFolder %>styles.css'
	    	}
	    },
	    
	    
		// Autoprefixer
	    // ====================
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 9']
			},
			all: {
				files: [{
					expand: true,
					cwd: '<%= destinationFolder %>',
					src: ['styles.css'],
					dest: '<%= destinationFolder %>',
					ext: '.css'
				}]
			}
		},

		
		// Watch
	    // ====================
		watch: {
			options: {
				interrupt: true,
				livereload: true,
				spawn: true
			},
			
			js:  {
				files: [
					'gruntfile.js',
					'<%= sourceFolder %>scripts/**/*.js'
				],
				tasks: [ 
					'concat:js', 
				//	'ngAnnotate:js', 
				//	'uglify:js' 
				],
			},

			styles:  {
				files: [
					'gruntfile.js',
					'<%= sourceFolder %>styles/**/*.less',
					'<%= sourceFolder %>styles/**/*.css'
				],
				tasks: [ 'less:all', 'autoprefixer:all' ],
			},

			templates: {
				files: [
					'gruntfile.js',
					'<%= sourceFolder %>scripts/**/*.html', 
					'<%= sourceFolder %>index.html'
				],
				tasks: [
					'copy:index', 
					'inline_angular_templates'
				]
			}
		}		
	});


	// load plugins
	// ====================
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-inline-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-ng-annotate');


	// Grunt build
	// ====================
	grunt.registerTask('build', [ 
		'concat:js', 
		//'ngAnnotate:js', 
		'uglify:js', 
		'less:all', 
		'autoprefixer:all',
		'copy:index',
		'inline_angular_templates'
	]);
	
	// Grunt build + Compress
	// ====================
	grunt.registerTask('build_prod', [
		'concat:js', 
		'ngAnnotate:js', 
		'uglify:js_compress', 
		'less:all_compress', 
		'autoprefixer:all',
		'copy:index',
		'inline_angular_templates'
	]);
	

	// Grunt dev
	// ====================
	grunt.registerTask('dev', [ 
		'build',
		'watch' 
	]);
};