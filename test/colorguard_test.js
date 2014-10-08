'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.colorguard = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  single_file: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/single_file');
    var expected = grunt.file.read('test/expected/single_file');
    test.equal(actual, expected, 'should describe what the single_file behavior is.');

    test.done();
  },
  whitelist: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/whitelist');
    var expected = grunt.file.read('test/expected/whitelist');
    test.equal(actual, expected, 'should describe what the whitelist behavior is.');

    test.done();
  },
  multi_collision: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/multi_collision');
    var expected = grunt.file.read('test/expected/multi_collision');
    test.equal(actual, expected, 'should accurately list multiple color collisions.');

    test.done();
  }
};
