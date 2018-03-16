
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');

const getEntries = pattern => {
  var entries = glob.sync(pattern);
  return entries.map(item => {
    return {
      path: item,
      extname: path.extname(item),
      filename: path.basename(item)
    }
  });
};

const popupHtmls = getEntries('./src/tpl/*.ejs').map(item => {
  const name = item.filename.split('.')[0];
  return new HtmlWebpackPlugin({
    template: item.path,
    // filename相对于output的目录！！
    // 可以全部用path.resolve(__dirname, 'path')来统一路径。。
    filename: `./html/${name}.html`,
    chunks: [name],
  });
});

const jsEntries = getEntries('./src/js/*.js').reduce((record, item) => {
  const name = item.filename.split('.')[0];
  record[name] = item.path;
  return record;
}, {});

module.exports = {
  entry: jsEntries,
  output: {
    filename: 'js/[name].js',
    // output path 指向dist更容易理解。
    // 所有filename都基于dist包括plugins中的
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)/,
        use: {
          // 不用url-loader了，chrome扩展基本不存在加载问题。。
          loader: 'file-loader',
          options: {
            outputPath: './img'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      "plugins": path.resolve(__dirname, '../src/js/plugins')
    }
  },
  plugins: [...popupHtmls]
};