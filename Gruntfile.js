/*
 * grunt-colorguard
 * https://github.com/elliottwilliams/grunt-colorguard
 *
 * Copyright (c) 2014 Elliott Williams
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    colorguard: {
      default_options: {
        options: {
        },

        src: ['test/fixtures/testing.css', 'test/fixtures/testing2.css'],
        dest: 'tmp/default_options'
      },
      whitelist: {
        options: {
          whitelist: [['#010101', '#020202']]
        },
        src: ['test/fixtures/testing.css', 'test/fixtures/testing2.css'],
        dest: 'tmp/whitelist'
      },
      single_file: {
        options: {
        },
        src: 'test/fixtures/testing2.css',
        dest: 'tmp/single_file'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'colorguard', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
