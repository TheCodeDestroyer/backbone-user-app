module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        // This line makes your node configurations available for use
        pkg: grunt.file.readJSON('package.json'),
        // This is where we configure JSHint
        jshint: {
            all: {
                src: ['Gruntfile.js',
                    'app/js/**/*.js'
                ],
                options: {
                    bitwise: true,
                    camelcase: true,
                    curly: true,
                    quotmark: 'single',
                    regexp: true,
                    undef: true,
                    unused: true,
                    eqeqeq: true,
                    eqnull: true,
                    browser: true,
                    globals: {
                        jQuery: true,
                        Backbone: true,
                        Handlebars: true,
                        module: true
                    }
                }
            }
        },
        watch: {
            jshint: {
                files: 'app/js/**/*.js',
                tasks: 'hint'
            }
        }
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // By default, jshint will be run
    //Care for naming as task name and package name need to be different
    grunt.registerTask('default', ['hint']);
    grunt.registerTask('hint', ['jshint']);
    grunt.registerTask('watchFiles', ['watch']);
};