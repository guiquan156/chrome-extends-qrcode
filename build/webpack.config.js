
module.exports = {
  entry: {
    'background': './src/js/background.js',
    'content-script': './src/js/content-script.js',
    'popup': './src/js/popup.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};