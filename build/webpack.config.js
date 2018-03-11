
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const popupHtml = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/tpl/popup.ejs'),
  filename: path.resolve(__dirname, '../dist/html/popup.html'),
  chunks: ['popup']
});


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
  },
  plugins: [popupHtml]
};