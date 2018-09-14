module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		uglify: {
			min: {
				files: {
					'ng-debounce-throttle.min.js': 'ng-debounce-throttle.js'
				}
			}
		}
	});

	grunt.registerTask('build', ['uglify']);

};