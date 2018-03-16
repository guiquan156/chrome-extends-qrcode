
const path = require('path');
const webpack = require('webpack');
const MemoryFS = require("memory-fs");
const vm = require('vm');
const fs = require('fs');

// const mfs = new MemoryFS();

const mfs = fs;

const outputDir = path.resolve(__dirname, '../dist');

const webpackConf = {
  entry: {
    manifest: './src/manifest.js'
  },
  output: {
    filename: '[name].js',
    path: outputDir
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
          loader: 'file-loader',
          options: {
            outputPath: './img'
          }
        }
      }
    ]
  }
};

const compiler = webpack(webpackConf);

compiler.outputFileSystem = mfs;

compiler.run((err, stats) => {
  if (err) return console.error(err);
  const code = mfs.readFileSync(outputDir + '/manifest.js').toString();
  const vmScp = new vm.Script(code, {});
  const ctx = {};
  vmScp.runInNewContext(ctx);
  fs.writeFileSync(outputDir + '/manifest.json', JSON.stringify(ctx.manifest));
});

