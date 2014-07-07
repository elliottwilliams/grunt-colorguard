# grunt-colorguard

Scan your application's css files for colors that are too-similar and conflict with each other. This task will output an error to Grunt's log if there are any color conflicts in the css files passed to it.

This plugin uses [css-colorguard](https://github.com/SlexAxton/css-colorguard) from SlexAxton in a Grunt task.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-colorguard --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-colorguard');
```

## The "colorguard" task

### Overview
In your project's Gruntfile, add a section named `colorguard` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  colorguard: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.threshold
Type: `Number`
Default value: `3`

How different two colors have to be to trigger a collision. 0 through 100. Lower is more similar. Anything below 3 warns you.

#### options.ignore
Type: `Array`
Default value: `[]`
Example value: `['#333333', '#444444']`

A list of colors to ignore entirely.

#### options.whitelist
Type: `Array`
Default value: `[[]]`
Example value: `[['#010101', '#020202']]`

A list of color *combinations* to ignore.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  colorguard: {
    options: {},
    files: {
      src: ['src/fixtures/testing.css', 'src/fixtures/testing2.css'],
    },
  },
});
```

Output:
```
#010101 [line: 2] is too close (0.1574963682909058) to #020202 [line: 5]
```

#### Custom Options

```js
grunt.initConfig({
  colorguard: {
    options: {
      whitelist: [['#010101', '#020202']]
    },
    files: {
      src: ['src/fixtures/testing.css', 'src/fixtures/testing2.css'],
    },
  },
});
```

Output:
```
3 colors analyzed. No collisons detected.
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
