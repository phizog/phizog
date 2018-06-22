/**
 * Base webpack config used across other specific configs
 */

const path = require('path')

module.exports = {
  module: {
    rules: [{
      test: /\.tsx?$/,
      loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader',
      exclude: /node_modules/
    }]
  },
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },
  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [],
  mode: process.env.NODE_ENV
}
