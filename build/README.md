# dg-build

## Commands
build will automatically add these scripts to your package.json.

### `npm run dev`
Runs the dev server. If target is present you will be asked for your login
details the first time you run. It caches the token for future uses.

If your token is failing to validate, restart your browser or clear your
cookies and you'll be prompted for a new one.

### `npm test`
Runs the unit tests.

### `npm build -- --serve`
Builds the project and outputs it to the build directory. If `serve` is present
the build directory will be served so you can check it in a browser at port 3000.


## Settings
Settings are stored in config.js file at the same level as package.json:

```javascript
// This demonstration shows the default values that are used
// if any configs are absent.
// Computed values are indicated in [square brackets].
module.exports = {
  src: {
    // The directory containing source files
    dir: 'src',

    // String or array of html templates that the output JS
    // will be injected into
    templates: '[src.dir]/index.html',

    // The entry point for the js
    main: '[src.dir]/main.js',

    // The favicon to use
    favicon: '[src.dir]/favicon.ico',

  },
  output: {
    // The directory to output the html files to on build
    dir: '[project dir name]',

    // The directory to output the js and asset files to on build
    resources: '[output.dir]/resources',

    // Whether or not to run `rimraf` on `dir` before build
    rimraf: true,

    // True to strip HTML comments from production code
    removeHtmlComments: true
  },
  test: {
    // The main test directory
    dir: 'test',

    // The unit test directory
    unit: '[test.dir]/unit'
  },
  serverConfig: function(expressApp){
    // A function that allows you to customise the express
    // dev server. Add custom middleware in here.
  },
  webpackConfig: function(webpackConfig, devOrProd){
    // A function that allows you to make more fine-grained adjustments
    // to the webpack config object as defined by dg-build.
  }
};
```

### Shorthand
You can specify the src, output and test objects as strings and they will
be expanded into sensible default configs:

```javascript
module.exports = {
  test: 'testing',
  src: 'source'
}

/*
The above will be expanded to:
{
  test: {
    dir: 'testing',
    unit: 'testing/unit',
    browser: 'testing/browser'
  },
  src: {
     dir: 'source',
     ...etc...
  }
}
*/
```
