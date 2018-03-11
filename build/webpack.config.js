
const path = require('path');

module.exports = {
  entry: {
    'background': './src/js/background.js',
    'content-script': './src/js/content-script.js',
    'popup': './src/js/popup.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/js')
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      "plugins": path.resolve(__dirname, '../src/js/plugins')
    }
  }
};