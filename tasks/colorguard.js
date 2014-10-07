/*
 * grunt-colorguard
 * https://github.com/elliottwilliams/grunt-contrib-colorguard
 *
 * Copyright (c) 2014 Elliott Williams
 * Licensed under the MIT license.
 */

'use strict';

var colorguard = require('colorguard');
var path = require('path');

var map = [];
var _currentMapLine = 0;

function addToMap(filename, contents) {
  var lines = contents.split('\n').length;
  var start = _currentMapLine;
  var end = _currentMapLine += lines;

  var entry = {
    name: filename,
    length: lines,
    start: start,
    end: end
  };

  map.push(entry);

  return entry;
}

function lookupLine(line) {
  for (var i = 0; i < map.length; i++) {
    var entry = map[i];
    if (entry.start <= line && entry.end >= line) {
      return {
        name: entry.filename,
        line: line - entry.start + 1
      };
    }
  }

  // When line wasn't found
  return false;
}

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

      var map = {};

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
        var contents = grunt.file.read(filepath);
        var name = path.basename(filepath);
        var lines = contents.split('\n').length;

        addToMap(name, contents);

        return contents;
      }).join('\n');

      var result = colorguard.inspect(src, {
        threshold: options.threshold,
        ignore: options.ignore,
        whitelist: options.whitelist
      });

      debugger;

      var message = '';

      if (result.collisions.length > 0) {
        console.log(result.collisions);
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
