/*
 * grunt-colorguard
 * https://github.com/elliottwilliams/grunt-contrib-colorguard
 *
 * Copyright (c) 2014 Elliott Williams
 * Licensed under the MIT license.
 */

'use strict';

var colorguard = require('colorguard');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('colorguard', 'Find and catch color collisions at build time.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({

      threshold: 3,
      ignore: [],
      whitelist: [[]]
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join('\n');

      var result = colorguard.inspect(src, {
        threshold: options.threshold,
        ignore: options.ignore,
        whitelist: options.whitelist
      });

      var message = '';

      if (result.collisions.length > 0) {
        message += result.collisions.map(function(c) {
          return c.message;
        }).join('\n');

        grunt.log.warn(message);

      } else {

        message += result.stats.total + ' colors analyzed. No collisons detected.';
        grunt.log.ok(message);
      }

      if (f.dest) {
        grunt.file.write(f.dest, message);
      }
    });
  });

};
