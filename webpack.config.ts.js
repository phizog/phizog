/**
 * Base webpack config used across other specific configs
 */

const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/main.ts'
  ],
  module: {
    rules: [{
      test: /\.ts?$/,
      loaders: ['awesome-typescript-loader'],
      exclude: /node_modules/
    }]
  },
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'main.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },
  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [],
  mode: process.env.NODE_ENV,
  target: 'electron-renderer',
  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
}
