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

function addToMap(map, filename, contents) {
  var lines = contents.split('\n').length;
  var start = (map.length) ? map[map.length-1].end + 1 : 1;
  var end = start + lines - 1;

  var entry = {
    name: filename,
    length: lines,
    start: start,
    end: end
  };

  map.push(entry);

  return entry;
}

function lookupLine(map, line) {
  for (var i = 0; i < map.length; i++) {
    var entry = map[i];
    if (entry.start <= line && entry.end >= line) {
      var result = {
        name: entry.name,
        line: line - entry.start + 1
      };
      return result;
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

    // Initalize sourcemap
    var sourcemap = [];

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
        var contents = grunt.file.read(filepath);
        var name = path.basename(filepath);

        var mapEntry = addToMap(sourcemap, name, contents);

        grunt.log.debug('added ' + name + ' (' + mapEntry.length + ' lines) ' +
          'to sourcemap.\ttotal lines: ' + mapEntry.end);

        grunt.verbose.debug(JSON.stringify(mapEntry, null, '  '));



        return contents;
      }).join('\n');

      grunt.verbose.debug('Concatenated source file:\n' + src + '\n-----');

      var result = colorguard.inspect(src, {
        threshold: options.threshold,
        ignore: options.ignore,
        whitelist: options.whitelist
      });

      grunt.verbose.debug('colorguard result:\n' +
        JSON.stringify(result, null, '  '));

      var message = '';

      function mapLineNumber(ln) {
        var mapped = lookupLine(sourcemap, ln);
        grunt.log.debug('line ' + ln + ' corresponds to ' + mapped.name +
          ':' + mapped.line);
        return mapped.name + ":" + mapped.line;
      }

      if (result.collisions.length > 0) {
        // console.log(result.collisions);
        message += result.collisions.map(function (collision) {

          // Build representations of both collisions.
          var a = {
            hex: collision.colors[0].rgb,
            mappedLines: collision.colors[0].lines.map(mapLineNumber)
          };

          var b = {
            hex: collision.colors[1].rgb,
            mappedLines: collision.colors[1].lines.map(mapLineNumber)
          };

          // Construct and return a message.
          return a.hex + " [" + a.mappedLines.join(', ') +
            "] is too close (" + collision.distance + ") to " + b.hex +
            " [" + b.mappedLines.join(', ') + "]";

        }).join('\n');

        grunt.log.warn(message);

      } else {

        message += result.stats.total + ' colors analyzed. No collisions detected.';
        grunt.log.ok(message);
      }

      if (f.dest) {
        grunt.file.write(f.dest, message);
      }
    });
  });

};
